import { Injectable } from "@nestjs/common";

//? In NestJS, repositories are used to interact with the database in an organized and efficient way.
//? They follow the Repository Design Pattern, which abstracts away the direct database interaction
//? by providing a dedicated class for handling data operations. Repositories help manage database
//? entities by offering methods like `find`, `save`, `update`, and `delete`, making it easier
//? to work with data while keeping your business logic clean and separated from database concerns.

//? In NestJS, repositories are commonly used with TypeORM (or other ORM libraries) to manage entities.
//? The `@EntityRepository()` decorator or `@InjectRepository()` decorator is used to inject a repository
//? into a service or controller, allowing you to access the underlying database through predefined methods.

//? Example:
//? ```
//? @Injectable()
//? export class UserService {
//?   constructor(
//?     @InjectRepository(User) private readonly userRepository: Repository<User>,
//?   ) {}
//?
//?   findAll(): Promise<User[]> {
//?     return this.userRepository.find();
//?   }
//? }
//? ```
//? In this example, `userRepository` is an instance of the `Repository<User>` class, which provides access
//? to database operations for the `User` entity. You can use it to perform CRUD operations on the `User` entity.
@Injectable()
export class UserRepository {
	constructor() {}

	create() {}
	find() {}
	findOne() {}
	update() {}
	delete() {}
}
