import { ClassConstructor, classToPlain, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./middleware.intrface";

type bodyRequest = keyof Pick<Request, "body" | "query">;

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>, private data: bodyRequest = "body") {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const instance = plainToClass(this.classToValidate, req[this.data]);

		validate(instance, { whitelist: true }).then((errors) => {
			const plain = classToPlain(instance);

			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				req.body = instance;
				next();
			}
		});
	}
}
