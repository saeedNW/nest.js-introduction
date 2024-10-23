import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

//? In NestJS, pipes are used to transform or validate data before it reaches your route handler.
//? You can use built-in pipes like `ValidationPipe`, but it's also possible to create custom pipes
//? to handle specific use cases, such as custom validation logic.

//? The example below defines a custom pipe called `EmailValidationPipe`. This pipe implements the
//? `PipeTransform` interface and provides custom validation logic for email addresses.
//? The `transform()` method is where the logic happens — it takes the incoming value, checks if
//? the value matches a specific regular expression for valid email formats, and either returns the
//? valid value or throws an exception if the validation fails.

//? Custom pipes like this are a great way to centralize and reuse validation logic across different
//? parts of your application. By throwing a `BadRequestException`, NestJS will automatically return
//? an HTTP 400 response with an appropriate error message when the input doesn't pass validation.
@Injectable()
export class EmailValidationPipe implements PipeTransform {
	transform(value: any) {
		const emailRegexp: RegExp =
			/^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*(?!.*\.\.)(?!.*\.-)@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]+$/;

		if (emailRegexp.test(value)) return value;

		throw new BadRequestException("Invalid email format");
	}
}
