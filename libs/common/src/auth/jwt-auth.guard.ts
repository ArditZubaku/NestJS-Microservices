import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

@Injectable()
// Expects to be passed a JWT cookie
export class JwtAuthGuard implements CanActivate {
  // This will allow us to communicate to other microservices via the provided transport layer
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        // Allows us to execute a side effect on the incoming respose
        tap((res) => {
          // Adding that incoming user to the current request object
          context.switchToHttp().getRequest().user = res;
        }),
        // Return true if we have a successful response back from the auth microservice => canActivate proceeds
        map(() => true),
      );
  }
}
