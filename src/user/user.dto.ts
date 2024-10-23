import { IsNumber, IsString, Length } from "class-validator";

//? In NestJS, a DTO (Data Transfer Object) is an object that defines the shape and structure
//? of data being sent across the network, typically from the client to the server.
//? DTOs are used to ensure data consistency and validation by explicitly defining what data
//? is expected for a particular operation (like creating or updating a user).

//? DTOs work seamlessly with NestJS validation libraries such as 'class-validator'.
//? You can use decorators like @IsString() or @IsNumber() to enforce validation rules on
//? the incoming data fields. These validations prevent invalid data from being processed
//? within the application.

//? In the example below, `CreateUserDto` defines three fields: `id`, `fullName`, and `job`,
//? with each field being validated. The `@IsNumber()` decorator ensures the 'id' is a number,
//? while `@IsString()` ensures 'fullName' and 'job' are strings. Additionally, the `@Length()`
//? decorator is used to limit the length of the `fullName` field.
//? DTOs simplify the validation process and help maintain clean, predictable APIs.

export class CreateUserDto {
	@IsNumber({}, { message: "id should be a number" })
	id: number;
	@IsString({ message: "full name should be a string" })
	@Length(3, 15, { message: "full name length should be 3 to 15 characters" })
	fullName: string;
	@IsString({ message: "job should be a string" })
	job: string;
}
