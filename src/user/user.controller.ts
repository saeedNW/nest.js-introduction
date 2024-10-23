import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { EmailValidationPipe } from "./pipes/email.pipe";

//? In order to let the NestJS knows that you are developing a controller
//? for your module you need to use `@Controller` decorator at the very
//? beginning of your controller class.

//? You can use the "@Controller" decorator with or without a path, which
//? if you don't define a path for the decorator, the default path which
//? is ("/") is used as the controller's access path(base URL route).But
//? if a route is defined, the given route is used as the access route
//? of the controller
//? No Path EX Result => http://localhost:3000/
//? With Path EX Result => http://localhost:3000/GivenPath
@Controller("/user")
export class UserController {
	//? In the NestJS framework, you can declare a controller's service
	//? variable as a private parameter in the controller's constructor
	//? and assign the class of that service as its type. With this, the
	//? NestJS system creates a new instance of the service class, and
	//? there is no need to use the keyword `new` at its beginning.
	constructor(private userService: UserService) {}

	//? In NestJs system you need to define decorators for controller's methods
	//? as a route handler. the decorators which you can use have the same names
	//? as the express router's methods which are [@Get, @Post, @Put, @patch, @Delete].
	//? Just like the `@controller` decorator you can use them with or without a path,
	//? which if you don't define a path for the decorator, the default path which
	//? is ("/") is used as the method's URL.But if a route is defined, the given
	//? route is used as the access route of the method
	//? No Path EX Result => http://localhost:3000/ControllerPath/
	//? With Path EX Result => http://localhost:3000/ControllerPath/GivenPath
	@Get()
	find(): any[] {
		return this.userService.find();
	}

	@Post()
	//? In NestJS, you can access data from various parts of the request such as the body, headers,
	//? parameters, and query by using decorators like `@Body()`, `@Header()`, `@Param()`, and `@Query()`.
	//? These decorators help specify which part of the request contains the data you're looking for.
	//? For example, `@Body()` provides access to the data in the request's body, while `@Param()` gives
	//? access to route parameters. After specifying the part to access, you define a variable name and type
	//? for the data object, e.g., `@Body() userDto: CreateUserDto`, where `userDto` is the object from the
	//? request body and its type is `CreateUserDto`.

	//? Now, with the introduction of DTOs (Data Transfer Objects), you can define the expected structure of
	//? the incoming data by using a specific DTO class. For example, `CreateUserDto` is a DTO that defines
	//? the shape of the data, ensuring it adheres to certain validation rules, such as requiring `fullName`
	//? to be a string between 3 to 15 characters.

	//? In addition, `ValidationPipe` is used to automatically validate the data against the DTO's rules.
	//? The `ValidationPipe` will check if the incoming request data matches the defined types and constraints
	//? within the `CreateUserDto`. If the data is invalid, an error is thrown, ensuring that your application
	//? only processes valid data.
	//? This allows for a more structured, type-safe, and reliable way of handling data.

	//? Alternatively, instead of using `ValidationPipe` in every controller method, you can apply it globally
	//? to your entire application in the `main.ts` file. By using `app.useGlobalPipes(new ValidationPipe())`,
	//? NestJS will automatically validate all incoming request data across all controllers and routes. This
	//? approach simplifies your code by removing the need to declare `ValidationPipe` for each individual route.
	//? This global configuration ensures that data validation is consistent throughout your application.

	//? EX with ValidationPipe => `@Body(new ValidationPipe()) userDto: CreateUserDto` => In this example,
	//? the data is accessed from the request body, validated against the `CreateUserDto`, and will only
	//? proceed if the validation passes.
	create(@Body() userDto: CreateUserDto): string {
		return this.userService.create(userDto);
	}

	@Get("/:id")
	//? As said before you can gain access to the data object in each part of the request by using
	//? a decorator related to that request part. The default result would be a object which is
	//? contains all the data in that part, but if you need to only get one of the data in that
	//? part, an 'id' for example, then you can define that data's name in the decorator declaration
	//? and the as result you would have only the requested data stored in the defined variable
	//? Note that you can also use several access decorators in the method's parameters, but don't
	//? forget to separate them with (,).

	//? Additionally, NestJS pipes can be used to transform or validate incoming data before it
	//? reaches your method. In the example below, the `ParseIntPipe` ensures that the 'id'
	//? parameter is transformed into an integer. Pipes are an excellent way to enforce validation
	//? and ensure that data is in the correct format before processing it in your application.
	findOne(@Param("id", ParseIntPipe) id: number): CreateUserDto {
		return this.userService.findOne(id);
	}

	@Post("/email")
	//? To use a custom pipe, simply attach it to a route handler parameter like so:
	//? `@Body('email', EmailValidationPipe) email: string` — this will validate the email field
	//? in the request body before passing it to the route handler.
	checkEmail(@Body("email", EmailValidationPipe) email: string): string {
		return email;
	}
}``
