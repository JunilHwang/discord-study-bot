import {createParamDecorator, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import { Request } from 'express'

export const Token = createParamDecorator((data: undefined, ctx: ExecutionContext): string => {
  const req: Request = ctx.switchToHttp().getRequest();
  const token: string|null = req.cookies.access_token || null
  if (token === null) throw new UnauthorizedException()
  return token
});

export const OptionalToken = createParamDecorator((data: undefined, req: Request): string =>
  req.cookies.access_token
);