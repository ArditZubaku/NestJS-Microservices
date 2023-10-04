import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../dto';
import { Reflector } from '@nestjs/core';

@Injectable()
// Expects to be passed a JWT cookie
export class JwtAuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(JwtAuthGuard.name);

  // This will allow us to communicate to other microservices via the provided transport layer
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
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

    return this.authClient
      .send<User>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        // Allows us to execute a side effect on the incoming response
        tap((res: User) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('The user does not have a valid role!');
                throw new UnauthorizedException();
              }
            }
          }
          // Adding that incoming user to the current request object
          context.switchToHttp().getRequest().user = res;
        }),
        // Return true if we have a successful response back from the auth microservice => canActivate proceeds
        map((): boolean => true),
        // Returns false if any error occurs => the error will be returned by the service that is being injected
        catchError((error): Observable<boolean> => {
          this.logger.error(error);
          return of(false);
        }),
      );
  }
}
