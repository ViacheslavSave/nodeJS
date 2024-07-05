import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../../common/base-controller";
import { HTTPError } from "../../../errors/http-error-class";
import { ILogger } from "../../../logger/logger-interface";
import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { IUserController } from "./users-controller-interface";
import { UserLoginDto } from "../dto/user-login-dto";
import { ValidateMiddlewareBody } from "../../../common/validate-middleware-body";
import { IConfigService } from "../../../config/config-service-interface";
import { IUsersService } from "../services/users-service-interface";
import { UserRegisterDto } from "../dto/user-register-dto";
import { Role } from "../../../common/types";
import { UserChangeDataDto } from "../dto/user-change-data-user-dto";
import { sign } from "jsonwebtoken";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/login",
				func: this.login,
				method: "post",
				middleware: [new ValidateMiddlewareBody(UserLoginDto)],
			},
			{
				path: "/register",
				func: this.register,
				method: "post",
				middleware: [new ValidateMiddlewareBody(UserRegisterDto)],
			},
			{
				path: "/headOfWarehouse",
				func: this.headOfWarehouse,
				method: "post",
				middleware: [new ValidateMiddlewareBody(UserRegisterDto)],
			},
			{
				path: "/changeDataUser",
				func: this.changeDataUser,
				method: "patch",
				middleware: [new ValidateMiddlewareBody(UserChangeDataDto)],
			},
		]);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, "ошибка авторизации", "login"));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get("SECRET"));
		res.set("authorization", jwt).send({ ...req.body, jwt });
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.userService.createUser(body, Role.user);
		if (result instanceof HTTPError) {
			return next(result);
		}

		this.ok(res, result);
	}

	async headOfWarehouse({ user, body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		if (user?.role !== Role.admin) {
			return this.notFound(res);
		}
		const result = await this.userService.createUser(body, Role.headOfWarehouse);
		if (result instanceof HTTPError) {
			return next(result);
		}

		return this.ok(res, result);
	}
	async changeDataUser({ user, body }: Request<{}, {}, UserChangeDataDto>, res: Response, next: NextFunction) {
		console.log(user);
		if (!user) {
			return this.notFound(res);
		}
		const result = await this.userService.changeDataUser(user, body);
		if (result instanceof HTTPError) {
			return next(result);
		}
		const jwt = await this.signJWT(result.email, this.configService.get("SECRET"));
		res.set("authorization", jwt).send({ ...result, jwt });

	}

	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign({ email, iat: Math.floor(Date.now() / 1000) }, secret, { algorithm: "HS256" }, (err, token) => {
				if (err || !token) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		});
	}
}
