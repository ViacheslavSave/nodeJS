import express, { Express } from "express";
import { LoggerService } from "./loger/loger.service";
import { ILogger } from "./loger/logger.interface";
import { PrismaService } from "./database/prisma.service";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IConfigService } from "./config/config.service.interface";
import { AuthMiddleware } from "./common/auth.middleware";
import { json } from "body-parser";
import "reflect-metadata";
import { UserService } from "./users/users.service";
import { IMiddleware } from "./common/middleware.intrface";
import { IAdminController } from "./users/admin/admin.controller.interface";
import { AdminController } from "./users/admin/admin.controller";
import { Request, Response, NextFunction } from "express";
import { HeadOfWarehouseController } from "./users/HeadOfWarehouse/headOfWarehouse.controller";

@injectable()
export class App {
	private app: Express;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.IAdminController) private adminController: AdminController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware,
		@inject(TYPES.IheadOfWarehouseController) private headOfWarehouseController: HeadOfWarehouseController
	) {
		this.app = express();
	}

	useRoutes() {
		this.app.use("/users", this.userController.router);
		this.app.use("/admin", this.adminController.router);
		this.app.use("/headOfWarehouse", this.headOfWarehouseController.router);
	}
	useMiddlewaire() {
		this.app.use(json());
		this.app.use(this.authMiddleware.execute.bind(this.authMiddleware));
	}
	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
	use404() {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.status(404).send("not found");
		});
	}

	async init(port: number) {
		this.useMiddlewaire();
		this.useRoutes();
		await this.prismaService.connect();
		this.useExeptionFilters();
		this.use404();

		this.app.listen(port, () => {
			this.logger.log(`[App] сервер запущен на http://localhost:${port}`);
		});
	}
}
