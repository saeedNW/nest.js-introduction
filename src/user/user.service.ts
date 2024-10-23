import { Injectable } from "@nestjs/common";

//? To let NestJS know that you are developing a service for your module,
//? you need to use the `@Injectable` decorator at the very beginning of
//? your service class. By adding `@Injectable()`, NestJS will recognize
//? the class as a service and manage its lifecycle through dependency
//? injection.This allows you to inject the service into other parts of
//? your application, such as controllers or other services, ensuring
//? efficient reusability and modularity.
@Injectable()
export class UserService {
	private users: any[] = [];

	find(): any[] {
		return this.users;
	}

	create(userDto: any): string {
		this.users.push(userDto);
		return "user has been created successfully";
	}

	findOne(id: number) {
		return this.users.find((user) => user.id === id);
	}
}
