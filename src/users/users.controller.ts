import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../loger/logger.interface";
import { TYPES } from "../types";
import { inject } from "inversify/lib/annotation/inject";
import { injectable } from "inversify/lib/annotation/injectable";
import "reflect-metadata";
import { IUserController } from "./users.controller.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { ValidateMiddleware } from "../common/validate.middleware";
import { IConfigService } from "../config/config.service.interface";
import { IUserService } from "./users.service.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: "/login",
				func: this.login,
				method: "post",
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const result = await this.userService.validateUser(body);
		if (!result) {
			return next(new HTTPError(401, "ошибка авторизации", "login"));
		}
		const jwt = await this.signJWT(body.email, this.configService.get("SECRET"));
		res.set("authorization", jwt).send({ ...body, jwt });
	}
}
