import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { loggerFunction } from "./middlewares/logger.middleware";
import { TransformerInterceptor } from "./interceptor/transformer.interceptor";
import { LoggerGuard } from "./guards/logger.guard";
import { HttpExceptionFilter } from "./Filters/exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//? In NestJS, you can apply pipes globally across the entire application by using `app.useGlobalPipes()`
	//? in the `main.ts` file. This is particularly useful when you want to enforce validation or transformation
	//? logic on all incoming requests without having to specify the pipe in each individual controller or route.
	app.useGlobalPipes(new ValidationPipe());

	//? In NestJS, you can apply interceptors globally using the `app.useGlobalInterceptors()` method in the `main.ts` file.
	//? This allows you to define behavior that should occur for all incoming requests and outgoing responses across your application.
	app.useGlobalInterceptors(new TransformerInterceptor());

	//? In NestJS, you can apply guards globally using `app.useGlobalGuards()` in the `main.ts` file.
	//? This ensures that the guard is executed for every incoming request, allowing you to enforce
	//? authentication or authorization across your entire application.
	app.useGlobalGuards(new LoggerGuard());

	//? In NestJS, you can apply middleware globally across your entire application by using `app.use()` in the
	//? `main.ts` file. This method is useful when you want the middleware to run for every incoming request,
	//? regardless of the route or controller.
	app.use(loggerFunction);

	//? In NestJS, you can apply global exception filters using the `app.useGlobalFilters()` method in the `main.ts` file.
	//? This ensures that any exception thrown within the application is caught and handled by the global filter, providing
	//? a centralized way to manage errors and customize responses for the entire application.
	app.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
