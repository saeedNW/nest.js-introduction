import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { map } from "rxjs";

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): any {
		// before
		console.log("Interceptor, before handler =>", new Date().getTime());

		// after
		return next.handle().pipe(
			map((data) => {
				if (typeof data === "string") {
					return {
						data: {
							message: data,
						},
					};
				}
				return { data };
			})
		);
	}
}
