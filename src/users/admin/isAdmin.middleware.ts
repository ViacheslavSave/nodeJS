import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../../common/middleware.intrface";

export class IsAdmin implements IMiddleware {
	execute({ user }: Request, res: Response, next: NextFunction) {
		if (user?.role !== "admin") {
			return res.status(404).send("not found");
		}
		next();
	}
}