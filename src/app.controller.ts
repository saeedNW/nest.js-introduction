import {
	BadRequestException,
	ConflictException,
	Controller,
	ForbiddenException,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseIntPipe,
	UnauthorizedException,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { LoggerInterceptor } from "./interceptor/logger.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { LoggerGuard } from "./guards/logger.guard";

@Controller()
//? Interceptors can be applied at the controller or method level using the `@UseInterceptors()` decorator.
//? You can apply multiple interceptors to a controller or method by separating them with (,)
@UseInterceptors(LoggerInterceptor)
//? Guards can be applied at the controller or method level using the `@UseGuards()` decorator.
//? You can apply multiple guards to a controller or method by separating them with (,)
@UseGuards(LoggerGuard)
export class AppController {
	@Get()
	getHello(): string {
		return "Hello Controller";
	}

	@Get("/data")
	//? You can also use the `@UseInterceptors()` decorator for each method separately
	//* @UseInterceptors(LoggerInterceptor)
	getData(): Object {
		return {
			users: [
				{
					id: 1,
					fullName: "saeed norouzi",
					job: "developer",
				},
				{
					id: 2,
					fullName: "saeed norouzi",
					job: "developer",
				},
			],
		};
	}

	@Get("/auth")
	//? You can also use the `@UseGuards()` decorator for each method separately
	@UseGuards(AuthGuard)
	checkAuth(): string {
		return "You are already logged in";
	}

	//? In NestJS, exceptions are used to handle errors in a structured way, ensuring that your application
	//? can consistently manage and respond to unexpected situations. When an exception is thrown, NestJS
	//? automatically catches it and sends an appropriate response to the client, making error handling easier
	//? and more predictable.

	//? NestJS provides several built-in exceptions, such as:
	//? - `BadRequestException`
	//? - `UnauthorizedException`
	//? - `ForbiddenException`
	//? - `NotFoundException`
	//? - `InternalServerErrorException`
	//? Each of these exceptions is tied to a specific HTTP status code (e.g., `400 Bad Request`, `401 Unauthorized`),
	//? and when thrown, NestJS sends a response with the correct status code and an error message.

	//? NestJS's built-in exception handling mechanism ensures that errors are managed consistently, reducing the
	//? chances of your application crashing due to unhandled errors. Exceptions help maintain code quality and
	//? improve the reliability of your application by catching and responding to errors effectively.
	@Get("/exception/:code")
	exceptionFilter(@Param("code", ParseIntPipe) code: number): any {
		switch (code) {
			case 400:
				//? Using NestJS default exceptions, including message and status cod
				throw new BadRequestException();
			case 401:
				throw new UnauthorizedException();
			case 403:
				//? Using NestJS default exceptions with custom message
				throw new ForbiddenException("Access Blocked");
			case 404:
				throw new NotFoundException();
			case 409:
				throw new ConflictException();
			case 429:
				//? Using NestJS `HttpException()` method to create a custom exception
				throw new HttpException(
					"to many requests",
					HttpStatus.TOO_MANY_REQUESTS
				);
			case 500:
				throw new InternalServerErrorException();
			default:
				throw new InternalServerErrorException();
		}
	}
}
