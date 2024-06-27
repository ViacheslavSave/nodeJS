import express, { Express } from "express";
import { ILogger } from "./logger/logger-interface";
import { PrismaService } from "./database/prisma-service";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { UserController } from "./domain/users/controllers/users-controller";
import { IExceptionFilter } from "./errors/exception-filter-interface";
import { AuthMiddleware } from "./common/auth-middleware";
import { json } from "body-parser";
// import "reflect-metadata";
import { Request, Response, NextFunction } from "express";
import { ProductsController } from "./domain/products/controllers/products-controller";

@injectable()
export class App {
	private app: Express;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.IProductsController) private productsController: ProductsController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.AuthMiddleware) private authMiddleware: AuthMiddleware
	) {
		this.app = express();
	}

	useRoutes() {
		this.app.use("/users", this.userController.router);
		this.app.use("/products", this.productsController.router);
	}
	useMiddleware() {
		this.app.use(json());
		this.app.use(this.authMiddleware.execute.bind(this.authMiddleware));
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
	use404() {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.status(404).send("not found");
		});
	}

	async init(port: number) {
		this.useMiddleware();
		this.useRoutes();
		await this.prismaService.connect();
		this.use404();
		this.useExceptionFilters();

		this.app.listen(port, () => {
			this.logger.log(`[App] сервер запущен на http://localhost:${port}`);
		});
	}
}
