import { injectable } from "inversify";
import { Logger, ILogObj } from "tslog";
import { ILogger } from "./logger-interface";
@injectable()
export class LoggerService implements ILogger {
	logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			prettyLogTemplate: "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t[{{filePathWithLine}}]\t",
		});
	}
	log(...args: unknown[]) {
		this.logger.info(...args);
	}
	error(...args: unknown[]) {
		this.logger.error(...args);
	}
	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}
