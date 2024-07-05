import { IConfigService } from "./config-service-interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger-interface";
import { TYPES } from "../types";

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error || !result.parsed) {
			console.log(result.error);
			this.logger.error("[ConfigService] Не удалось прочитать файл .env или он отсутствует");
		} else {
			this.logger.log("[ConfigService] Конфигурация .env загружена");
			this.config = result.parsed;
		}
	}

	get(key: string): string {
		const value = this.config[key];
		if (value === undefined) {
			throw new Error(`нет значения ${key} в .env`);
		}
		return this.config[key];
	}
}
