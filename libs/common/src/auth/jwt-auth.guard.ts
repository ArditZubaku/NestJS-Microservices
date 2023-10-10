import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common/types';

@Injectable()
// Expects to be passed a JWT cookie
export class JwtAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger: Logger = new Logger(JwtAuthGuard.name);
  private authService: AuthServiceClient;
  // This will allow us to communicate to other microservices via the provided transport layer
  constructor(
    @Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc,
    //Get access to the decorator and its metadata
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Where to get the jwt token from
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;
    if (!jwt) {
      return false;
    }

    const roles: string[] = this.reflector.get<string[]>(
      'roles',
      // Get the controller/route
      context.getHandler(),
    );

    return this.authService
      .authenticate({
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('The user does not have valid roles.');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = {
            ...res,
          };
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }

  onModuleInit(): any {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
}
