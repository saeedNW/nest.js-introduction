import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

//? In order to be able to use newly developed modules you
//? have to create a `*.module.ts` file for that module and
//? Import the files related to that module to its `*.module.ts`
//? file so the NestJS system recognizes and start using them

//? You must introduce your modules to the NestJS system
//? through the `@module` decorator
@Module({
	//? You have to declare module's controllers in the `controllers` option
	controllers: [UserController],
	//? You have to declare module's services in the `providers` option
	providers: [UserService],
})
export class UserModule {}
