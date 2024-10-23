import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { UserController } from "./user/user.controller";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerInterceptor } from "./interceptor/logger.interceptor";
import { LoggerGuard } from "./guards/logger.guard";

@Module({
	//? In order to create and use new services you have to create a module
	//? for that service and add that module into the `import` option of the
	//? app.module.ts file
	imports: [UserModule],
	controllers: [AppController],
	providers: [
		//? In NestJS, you can register global interceptors using the `providers` array within a module.
		//? This is particularly useful when you want to apply the same interceptor across all routes in your application
		//? without needing to specify it for each controller or method.
		//? The `APP_INTERCEPTOR` token is a built-in constant provided by NestJS that allows you to register
		//? an interceptor globally. When you provide an interceptor using this token, it will be invoked for every
		//? incoming request and outgoing response throughout your application.
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
		//? In NestJS, you can register a global guard using the `APP_GUARD` token within the `providers` array of a module.
		//? This method allows the guard to be applied automatically to every route in the application, ensuring consistent
		//? security checks such as authentication or authorization.
		{
			provide: APP_GUARD,
			useClass: LoggerGuard,
		},
		AppService,
	],
})
//? In order to be able to use middlewares in a module that module needs to be implemented from
//?`NestModule` interface
export class AppModule implements NestModule {
	//? In NestJS, middleware can be applied to specific routes or controllers using the `configure()` method
	//? of the module where you want to apply the middleware. The `configure()` method is implemented by
	//? extending the `NestModule` interface, and it uses the `MiddlewareConsumer` to control which routes
	//? or controllers the middleware is applied to.

	//? Using the `MiddlewareConsumer`, you can fine-tune the scope of the middleware to cover specific routes,
	//? methods, or controllers, providing flexible control over where the middleware is executed.

	//? Below are examples of different ways to use the `configure()` method with middleware:
	configure(consumer: MiddlewareConsumer) {
		//? `consumer.apply(LoggerMiddleware).forRoutes("/user/email")` — This applies the `LoggerMiddleware`
		//? only to the `/user/email` route, regardless of the HTTP method.
		consumer.apply(LoggerMiddleware).forRoutes("/user/email");

		//? `consumer.apply(LoggerMiddleware).forRoutes(UserController, AppController)` — This applies the
		//? `LoggerMiddleware` to all routes handled by the `UserController` and `AppController`.
		consumer.apply(LoggerMiddleware).forRoutes(UserController, AppController);

		//? `consumer.apply(LoggerMiddleware).forRoutes({ path: "/user", method: RequestMethod.POST })` — This
		//? applies the `LoggerMiddleware` only to `POST` requests made to the `/user` route. You can use the
		//? `RequestMethod` enum to specify which HTTP methods the middleware should apply to.
		consumer.apply(LoggerMiddleware).forRoutes({
			path: "/user",
			method: RequestMethod.POST,
		});

		//? `consumer.apply(LoggerMiddleware).forRoutes({ path: "/user", method: RequestMethod.GET }, "/user/email", AppController)`
		//? — In this case, the `LoggerMiddleware` is applied to multiple routes and methods at once:
		//? 1. `GET` requests to the `/user` route.
		//? 2. All methods for the `/user/email` route.
		//? 3. All routes handled by the `AppController`.
		consumer.apply(LoggerMiddleware).forRoutes(
			{
				path: "/user",
				method: RequestMethod.GET,
			},
			"/user/email",
			AppController
		);
	}
}
