import { Response, Router } from "express";
import { IControllerRoute } from "./route-interface";
import { ILogger } from "../logger/logger-interface";
import { injectable } from "inversify/lib/annotation/injectable";
import "reflect-metadata";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILogger) {
		this._router = Router();
	}
	get router() {
		return this._router;
	}
	protected send<T, R extends Response>(res: R, code: number, message: T): R {
		res.type("application/json");
		return res.status(code).json(message);
	}

	protected ok<T>(res: Response, message: T): Response<any, Record<string, any>> {
		return this.send(res, 200, message);
	}
	protected notFound<T>(res: Response): Response<any, Record<string, any>> {
		return this.send(res, 404, "not found");
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middleware = route.middleware?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
