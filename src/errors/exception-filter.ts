import { injectable } from "inversify/lib/annotation/injectable";
import { inject } from "inversify/lib/annotation/inject";
import { Request, Response, NextFunction } from "express";
import { IExceptionFilter } from "./exception-filter-interface";
import { HTTPError } from "./http-error-class";
import { ILogger } from "../logger/logger-interface";
import { TYPES } from "../types";
import "reflect-metadata";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`[ExceptionFilter] ${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
