import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./middleware-interface";
import { Role } from "./types";

export class ValidateMiddlewareFilterProductQuery implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		let availability = false;

		if (!req.user || req.user.role === Role.user) {
			availability = true;
		}

		const { text, priceMin, priceMax, ...characteristics } = req.query;
		const arr = Object.entries(characteristics).map(([property, value]) => {
			return { property, value };
		});

		const filter: Record<string, unknown> = {};
		filter.availability = availability;
		priceMin && (filter.priceMin = priceMin);
		priceMax && (filter.priceMax = priceMax);
		text && (filter.text = text);
		characteristics && (filter.characteristics = arr);

		const instance = plainToClass(this.classToValidate, filter);
		validate(instance, { whitelist: true }).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send({ query: req.query, errors });
			} else {
				req.body = instance;
				next();
			}
		});
	}
}
