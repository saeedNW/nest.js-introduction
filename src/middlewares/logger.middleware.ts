import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

//? In NestJS, middleware is a function that is called before the route handler in the request-response cycle.
//? Middleware can be used to perform tasks such as logging, authentication, validation, or modifying the request
//? object before it reaches the route handler. They are especially useful when you need to apply some logic to
//? multiple routes or the entire application.

//? To create middleware in NestJS, you need to implement the `NestMiddleware` interface and define a class
//? with a `use()` method. The `use()` method receives the request, response, and `next()` function, and it
//? must call `next()` to pass control to the next middleware or route handler.

//? After defining the middleware, you need to apply it to routes. You can apply middleware in specific modules
//? by using the `configure()` method in the module class, or apply it globally by using `app.use()` in the
//? `main.ts` file.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(`class middleware - ${req.method}: ${req.baseUrl}${req.path}`);
		next();
	}
}

//? Note that in order to apply a Middleware globally by using `app.use()` in the `main.ts` file, you can't use
//? a class middleware which has `@Injectable()` decorator and has been implanted from NestMiddleware, because
//? in NestJS by using the `@Injectable()` the NestJS will automatically create a new instance of that class upon
//? using that class in the module or controller but in the `app.use()` command this process wont be happening as
//? result your application will crash and prevent from running. in order to fix this problem you can use functional
//? middlewares instead of class middlewares
export function loggerFunction(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(
		`functional middleware - ${req.method}: ${req.baseUrl}${req.path}`
	);
	next();
}
