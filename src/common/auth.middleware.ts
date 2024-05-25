import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { verify } from "jsonwebtoken";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IMiddleware } from "./middleware.intrface";
import { UserService } from "../users/users.service";

@injectable()
export class AuthMiddleware implements IMiddleware {
	private _secret: string;
	constructor(
		@inject(TYPES.ConfigService) configService: IConfigService,
		@inject(TYPES.UserService) private userService: UserService
	) {
		this._secret = configService.get("SECRET");
	}

	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this._secret, async (err, payload) => {
				if (typeof payload === "object") {
					req.user = await this.userService.getUserInfo(payload.email);
				}
				next();
			});
		} else {
			next();
		}
	}
}
