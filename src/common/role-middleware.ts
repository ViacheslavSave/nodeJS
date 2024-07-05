import { UserModel } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { HTTPError } from "../errors/http-error-class";
import { IMiddleware } from "./middleware-interface";
import { Role } from "./types";

//!----------------------------------------------------------------------------
//!----------------------------------------------------------------------------

export class AvailableToRoles implements IMiddleware {
	constructor(private availableToRoles: Role[]) {}
	execute({ user }: Request, res: Response, next: NextFunction) {
		checkUser(user);
		if (user && this.availableToRoles.includes(user.role as Role)) {
			return next();
		}
		throw new HTTPError(401, "Не авторизован", "AvailableToRoles");
	}
}

function checkUser(user: Request["user"]): asserts user is UserModel {
	if (!user) {
		throw new HTTPError(401, "Не авторизован", "AvailableToRoles");
	}
}
