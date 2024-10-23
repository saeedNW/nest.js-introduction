import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

//? In NestJS, guards are used to determine whether a request should be handled by the route handler
//? or not. They are primarily used for authentication and authorization, making sure that only
//? authorized users can access certain routes.

//? Guards implement the `CanActivate` interface and define a `canActivate()` method. This method
//? returns a boolean or a promise/observable that resolves to a boolean, indicating whether the
//? request should proceed to the route handler. If the guard returns `true`, the request is processed;
//? otherwise, it is denied.

//? Guards can be applied at the method or controller level using the `@UseGuards()` decorator, or globally
//? by adding them to the `providers` array with the `APP_GUARD` token for the entire application.
@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request: Request = context.switchToHttp().getRequest<Request>();
		const token = request?.headers?.authorization;
		return !!token;
	}
}
