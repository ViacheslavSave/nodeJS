import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base.controller";
import { ILogger } from "../../loger/logger.interface";
import { TYPES } from "../../types";
import { inject } from "inversify/lib/annotation/inject";
import { injectable } from "inversify/lib/annotation/injectable";
// import "reflect-metadata";
import { ValidateMiddleware } from "../../common/validate.middleware";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { IHeadOfWarehouseController } from "./headOfWarehouse.controller.interface";
import { IHeadOfWarehouseService } from "./headOfWarehouse.service.interface";
import { IsHeadOfWarehouse } from "./isHeadOfWarehouse.middleware";
import { AddQuantityInProductDto } from "../dto/mobile.dto/addQuantityInProduct.dto";

@injectable()
export class HeadOfWarehouseController extends BaseController implements IHeadOfWarehouseController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IheadOfWarehouseService) private headOfWarehouseService: IHeadOfWarehouseService
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: "/products",
				func: this.findProducts,
				method: "get",
				middlewares: [new IsHeadOfWarehouse(), new ValidateMiddleware(AdminFindMobileDto, "query")],
			},
			{
				path: "/products",
				func: this.newParish,
				method: "post",
				middlewares: [new IsHeadOfWarehouse(), new ValidateMiddleware(AddQuantityInProductDto)],
			},
		]);
	}

	async findProducts({ query }: Request<{}, {}, {}, AdminFindMobileDto>, res: Response, next: NextFunction) {
		const result = await this.headOfWarehouseService.findProducts(query);
		this.ok(res, result);
	}

	async newParish({ body }: Request<{}, {}, AddQuantityInProductDto>, res: Response, next: NextFunction) {
		const result = await this.headOfWarehouseService.updateQuantityProduct(body);
		this.ok(res, result);
	}
}
