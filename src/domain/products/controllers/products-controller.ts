import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../../../common/base-controller";
import { Role } from "../../../common/types";
import { ValidateMiddlewareBody } from "../../../common/validate-middleware-body";
import { ValidateMiddlewareFilterProductQuery } from "../../../common/validate-middleware-query";
import { HTTPError } from "../../../errors/http-error-class";
import { ILogger } from "../../../logger/logger-interface";
import { TYPES } from "../../../types";
import { ProductAddDto } from "../dto/product-create-dto";
import { ProductFilterDto } from "../dto/product-filter-dto";
import { IProductsService } from "../services/products-service-interface";
import { IProductsController } from "./products-controller-interface";

@injectable()
export class ProductsController extends BaseController implements IProductsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IProductsService) private productService: IProductsService // @inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "",
				func: this.getProduct,
				method: "get",
				middleware: [new ValidateMiddlewareFilterProductQuery(ProductFilterDto)],
			},
			{
				path: "",
				func: this.createProduct,
				method: "post",
				middleware: [new ValidateMiddlewareBody(ProductAddDto)],
			},
			{
				path: "/:id",
				func: this.deleteProduct,
				method: "delete",
			},
			{
				path: "/",
				func: this.changeCount,
				method: "patch",
			},
		]);
	}

	async getProduct({ body }: Request<{}, {}, ProductFilterDto>, res: Response, next: NextFunction) {
		const productsOrHTTP = await this.productService.getProducts(body);
		if (productsOrHTTP instanceof Error) {
			return next(productsOrHTTP);
		}
		this.ok(res, { productsSum: productsOrHTTP.length, productsOrHTTP });
	}

	async createProduct({ user, body }: Request<{}, {}, ProductAddDto>, res: Response, next: NextFunction) {
		if (user?.role !== Role.admin) {
			return next(new HTTPError(401, "Не авторизован"));
		}
		const product = await this.productService.createProduct(user, body);
		this.ok(res, product);
	}

	async deleteProduct({ user, params }: Request, res: Response, next: NextFunction) {
		if (user?.role !== Role.admin) {
			return next(new HTTPError(401, "Не авторизован"));
		}
		const id = params.id.match(/^(\d+)$/g)?.[0];
		if (!id) {
			return next(new HTTPError(422, "неверные данные"));
		}
		const product = await this.productService.deleteProduct(user.id, parseInt(id));
		if (product instanceof Error) {
			return next(product);
		}
		this.ok(res, product);
	}

	async changeCount(
		{ user, body: { quantity, id } }: Request<{}, {}, { quantity: string; id: string }>,
		res: Response,
		next: NextFunction
	) {
		if (user?.role !== Role.headOfWarehouse) {
			return next(new HTTPError(401, "Не авторизован"));
		}

		const quantityValid = quantity.match(/^-?(\d+)$/g)?.[0];
		const idValid = id.match(/^-?(\d+)$/g)?.[0];
		if (!quantityValid || idValid) {
			return next(new HTTPError(422, "неверные данные"));
		}

		const product = await this.productService.changeCountProduct({ id: parseInt(id), quantity: parseInt(quantityValid) });
		if (product instanceof Error) {
			return next(product);
		}
		this.ok(res, product);
	}
}
