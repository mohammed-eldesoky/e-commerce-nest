

// inject  user into req

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { strict } from "assert";

export const User = createParamDecorator((data:string, context:ExecutionContext) =>{

    const request = context.switchToHttp().getRequest();

    return data ? request.user[data] : request.user;

} );