import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { inject, injectable } from "inversify";
import { HTTPError } from "../errors/http-error-class";
import { ILogger } from "../logger/logger-interface";
import { TYPES } from "../types";
@injectable()
export class BaseRepositoryPrisma {
	@inject(TYPES.ILogger)
	loggerService: ILogger;
	constructor() {}
	async errorHandling<T>(requestInDB: T, context: string): Promise<HTTPError | T> {
		try {
			return await requestInDB;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				this.loggerService.error(context, ",", error.code, error.name, error.message);

				switch (error.code) {
					case "P2025":
						return new HTTPError(400, "Записи не существует");
					case "P2002":
						return new HTTPError(400, "Запись уже существует");
					default:
						this.loggerService.error("Неучтенная ошибка Prisma");
				}
			} else if (error instanceof Error) {
				this.loggerService.error(context, error.name, error.message);
			}
			return new HTTPError(500, "Ошибка сервера");
		}
	}
}
