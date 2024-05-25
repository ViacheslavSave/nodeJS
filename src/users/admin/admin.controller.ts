import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { HTTPError } from "../../errors/http-error.class";
import { ILogger } from "../../loger/logger.interface";
import { TYPES } from "../../types";
import { inject } from "inversify/lib/annotation/inject";
import { injectable } from "inversify/lib/annotation/injectable";
import "reflect-metadata";
import { ValidateMiddleware } from "../../common/validate.middleware";
import { IConfigService } from "../../config/config.service.interface";
import { IUserService } from "../users.service.interface";
import { IAdminController } from "./admin.controller.interface";
import { AdminRegisterDto } from "../dto/admin-register.dto";
import { IAdminService } from "./admin.service.interface";
import { AdminCreateMobileDto } from "../dto/mobile.dto/create-mobile.dto";
import { IsAdmin } from "./isAdmin.middleware";
import { AdminUpdateMobileDto } from "../dto/mobile.dto/update-mobile.dto";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { UserRegisterDto } from "../dto/user-register.dto";

@injectable()
export class AdminController extends BaseController implements IAdminController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IAdminService) private adminService: IAdminService,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: "/register",
				func: this.register,
				method: "post",
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: "/registerHeadOfWarehouse",
				func: this.registerHeadOfWarehouse,
				method: "post",
				middlewares: [new IsAdmin(), new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: "/products",
				func: this.findProducts,
				method: "get",
				middlewares: [new IsAdmin(), new ValidateMiddleware(AdminFindMobileDto, "query")],
			},
			{
				path: "/products",
				func: this.createProduct,
				method: "post",
				middlewares: [new IsAdmin(), new ValidateMiddleware(AdminCreateMobileDto)],
			},
			{
				path: "/products/:id",
				func: this.deleteProduct,
				method: "delete",
				middlewares: [new IsAdmin()],
			},
			{
				path: "/products",
				func: this.updateProduct,
				method: "patch",
				middlewares: [new IsAdmin(), new ValidateMiddleware(AdminUpdateMobileDto)],
			},
		]);
	}

	async register({ body }: Request<{}, {}, AdminRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.adminService.createUser(body, "admin");
		if (!result) {
			return next(new HTTPError(422, "Пользователь с таким email уже существует"));
		}
		this.ok(res, result);
	}

	async registerHeadOfWarehouse({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result = await this.adminService.createUser(body, "headOfWarehouse");
		if (!result) {
			return next(new HTTPError(422, "Пользователь с таким email уже существует"));
		}
		this.ok(res, { statusText: "начальник склада успешно создан" });
	}

	async createProduct({ user, body }: Request<{}, {}, AdminCreateMobileDto>, res: Response, next: NextFunction) {
		if (!user) {
			return next(new HTTPError(500, "Internal Server Error"));
		}
		const resultCreation = await this.adminService.createProduct(body, user.id);
		if (!resultCreation) {
			return next(new HTTPError(400, "The product is already in the database"));
		}
		this.ok(res, resultCreation);
	}

	async deleteProduct(req: Request, res: Response, next: NextFunction) {
		const result = await this.adminService.deleteProduct(parseInt(req.params.id));
		if (!result) {
			return next(new HTTPError(400, "Bad Request"));
		}
		this.ok(res, result);
	}

	async updateProduct({ body }: Request<{}, {}, AdminUpdateMobileDto>, res: Response, next: NextFunction) {
		const result = await this.adminService.updateProduct(body);
		this.ok(res, result);
	}

	async findProducts({ query }: Request<{}, {}, {}, unknown>, res: Response, next: NextFunction) {
		const result = await this.adminService.findProducts(query as AdminFindMobileDto);
		this.ok(res, result);
	}
}
