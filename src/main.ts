import "reflect-metadata";
import { App } from "./app";
import { Container, ContainerModule } from "inversify";
import { interfaces } from "inversify/lib/interfaces/interfaces";
import { TYPES } from "./types";
import { ILogger } from "./loger/logger.interface";
import { LoggerService } from "./loger/loger.service";
import { PrismaService } from "./database/prisma.service";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { UserController } from "./users/users.controller";
import { IUserController } from "./users/users.controller.interface";
import { UserRepository } from "./users/users.repository";
import { IUsersRepository } from "./users/users.repository.interface";
import { UserService } from "./users/users.service";
import { IUserService } from "./users/users.service.interface";
import { IMiddleware } from "./common/middleware.intrface";
import { AuthMiddleware } from "./common/auth.middleware";
import { AdminService } from "./users/admin/admin.service";
import { IAdminService } from "./users/admin/admin.service.interface";
import { IAdminController } from "./users/admin/admin.controller.interface";
import { AdminController } from "./users/admin/admin.controller";
import { HeadOfWarehouseController } from "./users/HeadOfWarehouse/headOfWarehouse.controller";
import { IHeadOfWarehouseController } from "./users/HeadOfWarehouse/headOfWarehouse.controller.interface";
import { IHeadOfWarehouseService } from "./users/HeadOfWarehouse/headOfWarehouse.service.interface";
import { HeadOfWarehouseService } from "./users/HeadOfWarehouse/headOfWarehouse.service";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UserRepository).inSingletonScope();
	bind<IMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware).inSingletonScope();
	bind<IAdminService>(TYPES.IAdminService).to(AdminService).inSingletonScope();
	bind<IAdminController>(TYPES.IAdminController).to(AdminController).inSingletonScope();
	bind<IHeadOfWarehouseController>(TYPES.IheadOfWarehouseController).to(HeadOfWarehouseController).inSingletonScope();
	bind<IHeadOfWarehouseService>(TYPES.IheadOfWarehouseService).to(HeadOfWarehouseService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	const config = appContainer.get<IConfigService>(TYPES.ConfigService);
	await app.init(parseInt(config.get("PORT")));
	return { appContainer };
}

export const boot = bootstrap();
