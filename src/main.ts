import "reflect-metadata";
import { App } from "./app";
import { Container, ContainerModule } from "inversify";
import { interfaces } from "inversify/lib/interfaces/interfaces";
import { TYPES } from "./types";
import { ILogger } from "./logger/logger-interface";
import { LoggerService } from "./logger/logger-service";
import { PrismaService } from "./database/prisma-service";
import { ConfigService } from "./config/config-service";
import { IConfigService } from "./config/config-service-interface";
import { ExceptionFilter } from "./errors/exception-filter";
import { IExceptionFilter } from "./errors/exception-filter-interface";
import { UserController } from "./domain/users/controllers/users-controller";
import { IUserController } from "./domain/users/controllers/users-controller-interface";
import { IUsersService } from "./domain/users/services/users-service-interface";
import { IMiddleware } from "./common/middleware-interface";
import { AuthMiddleware } from "./common/auth-middleware";
import { UsersService } from "./domain/users/services/users-service";
import { UserRepository } from "./domain/users/repository/users-repository";
import { IUsersRepository } from "./domain/users/repository/users-repository-interface";
import { IProductsController } from "./domain/products/controllers/products-controller-interface";
import { ProductsController } from "./domain/products/controllers/products-controller";
import { IProductsService } from "./domain/products/services/products-service-interface";
import { ProductsService } from "./domain/products/services/products-service";
import { IProductsRepository } from "./domain/products/repository/products-repository-interface";
import { ProductsRepository } from "./domain/products/repository/products-repository";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUsersService>(TYPES.UserService).to(UsersService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UserRepository).inSingletonScope();

	bind<IProductsController>(TYPES.IProductsController).to(ProductsController).inSingletonScope();
	bind<IProductsService>(TYPES.IProductsService).to(ProductsService).inSingletonScope();
	bind<IProductsRepository>(TYPES.IProductsRepository).to(ProductsRepository).inSingletonScope();

	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();

	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	const config = appContainer.get<IConfigService>(TYPES.ConfigService);
	await app.init(parseInt(config.get("PORT")));
  return {appContainer,app}

}

export const boot = bootstrap();

