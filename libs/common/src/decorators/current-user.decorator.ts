import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@app/common/models/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }

  // If context.getType() is GraphQL
  const user = context.getArgs()[2]?.req.headers.user;
  if (user) {
    // Since we stringify the user in the gateway, we need to parse it back to an object
    return JSON.parse(user);
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
