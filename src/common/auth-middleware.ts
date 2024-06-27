import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { verify } from "jsonwebtoken";
import { IConfigService } from "../config/config-service-interface";
import { TYPES } from "../types";
import { IMiddleware } from "./middleware-interface";
import { UsersService } from "../domain/users/services/users-service";
import { HTTPError } from "../errors/http-error-class";

@injectable()
export class AuthMiddleware implements IMiddleware {
	private readonly _secret: string;
	constructor(
		@inject(TYPES.ConfigService) configService: IConfigService,
		@inject(TYPES.UserService) private userService: UsersService
	) {
		this._secret = configService.get("SECRET");
	}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this._secret, async (err, payload) => {
				if (typeof payload === "object") {
					const user = await this.userService.getUserInfo(payload.email);

					if (user instanceof HTTPError) {
						return next(user);
					}
					req.user = user;
				}
				next();
			});
		} else {
			next();
		}
	}
}
