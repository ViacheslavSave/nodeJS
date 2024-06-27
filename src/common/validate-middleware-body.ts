import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./middleware-interface";

export class ValidateMiddlewareBody implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		const instance = plainToClass(this.classToValidate, req.body);

		validate(instance, { whitelist: true }).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				req.body = instance;
				next();
			}
		});
	}
}
