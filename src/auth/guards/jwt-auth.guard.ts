import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here if needed, for example:
    // - Checking for specific roles
    // - Logging authentication attempts

    return super.canActivate(context); // This will trigger the JwtStrategy's validate method
  }
}
