import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { tap } from "rxjs";
@Injectable()

//? In NestJS, interceptors are used to intercept and manipulate the request/response cycle. They are especially useful
//? for tasks like logging, transforming data, handling caching, or modifying the response structure. Interceptors
//? can also be used to execute code before or after a method is invoked.

//? Interceptors implement the `NestInterceptor` interface and use the `intercept()` method, which gives you access
//? to the `ExecutionContext` and `CallHandler`. The `intercept()` method can control whether the request proceeds to the
//? next handler, modify the data being returned, or catch and handle errors in the flow.

//? Example of an interceptor usage:
//? 1. **Logging:** Log the time taken to process each request.
//? 2. **Response Mapping:** Modify the format of the response before it is sent to the client.
//? 3. **Error Handling:** Catch and handle errors globally.

//? To apply an interceptor globally, you can use `app.useGlobalInterceptors()` in `main.ts`, which ensures that
//? the interceptor will be executed for all routes in your application:
//? Example: `app.useGlobalInterceptors(new LoggingInterceptor())` — This would apply the `LoggingInterceptor` globally,
//? ensuring that every request is logged regardless of which route or controller is handling the request.

//? Interceptors can also be applied at the controller or method level using the `@UseInterceptors()` decorator.
//? Example: `@UseInterceptors(LoggingInterceptor)` — This would apply the `LoggingInterceptor` to the controller
//? or method, ensuring that every request going through the controller or method with this decorator is logged.
export class LoggerInterceptor implements NestInterceptor {
	async intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Promise<any> {
		// before
		console.log("Interceptor, before handler =>", new Date().getTime());

		await sleep(100);

		// after
		return next
			.handle()
			.pipe(
				tap(() =>
					console.log("Interceptor, after handler =>", new Date().getTime())
				)
			);
	}
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
