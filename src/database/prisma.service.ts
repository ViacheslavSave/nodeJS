import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../loger/logger.interface";

// const prisma = new PrismaClient();
@injectable()
export class PrismaService {
	client: PrismaClient = new PrismaClient();
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	async connect() {
		try {
			await this.client.$connect();
			this.logger.log("[PrismaService] Успешно подключились к базе данных");
		} catch (error) {
			if (error instanceof Error) {
				{
					const message = "[PrismaService] Ошибка подключения к базе данных ";
					this.logger.error(message + error.message);
					throw error;
				}
			}
		}
	}
	async disconnect() {
		await this.client.$disconnect();
	}
}
