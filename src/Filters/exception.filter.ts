import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

//? When exceptions are thrown, they can be caught and managed using **exception filters**. Exception filters allow
//? you to handle errors in a centralized way and format the response as needed.

//? In NestJS, exception filters are used to handle errors and exceptions in a centralized and structured manner.
//? They allow you to catch exceptions that occur during the request/response cycle and provide a consistent
//? way to return error responses to the client.

//? By default, NestJS provides built-in exception handling, but you can create custom exception filters
//? to handle specific types of exceptions or modify the response format for errors.

//? Exception filters implement the `ExceptionFilter` interface and use the `catch()` method, which provides
//? access to the exception object and the `ArgumentsHost` (which contains information about the request and response).

//? In this example, the `HttpExceptionFilter` catches any `HttpException` and customizes the response format.
//? You can use `@Catch()` to specify the types of exceptions that the filter should handle.

//? You can apply exception filters in multiple ways:
//? 1. **Globally** using `app.useGlobalFilters()` in `main.ts` to catch exceptions across the entire application.
//? 2. **At the controller level** using the `@UseFilters()` decorator to apply a filter to specific controllers.
//? 3. **At the route handler level** using `@UseFilters()` to apply a filter to a single method.

//? Exception filters provide a powerful way to manage errors and customize how your application handles exceptions.
//? This ensures that your application returns consistent error messages and statuses, improving debugging
//? and client-side error handling.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse<Response>();
		const request: Request = ctx.getRequest<Request>();
		const statusCode: number = exception.getStatus();

		const exceptionResponse: string | object = exception.getResponse();
		let message: string = "";

		// Check if the response is an object or a string
		if (typeof exceptionResponse === "string") {
			message = exceptionResponse; // Handle case where it's a string
		} else if (
			typeof exceptionResponse === "object" &&
			"message" in exceptionResponse
		) {
			message = (exceptionResponse as { message: string }).message; // Handle case where it's an object
		}

		response.status(statusCode).json({
			statusCode,
			success: false,
			message,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
