import { injectable, inject } from "inversify";
import { BaseRepositoryPrisma } from "../../../database/base-repository-prisma";
import { PrismaService } from "../../../database/prisma-service";
import { TYPES } from "../../../types";
import {
	ProductsGetOrHTTPError,
	ProductGetOrHTTPError,
	ProductCreatePrisma,
	IChangeCount,
	IProductFilter,
} from "../types/product-types";
import { IProductsRepository } from "./products-repository-interface";

@injectable()
export class ProductsRepository extends BaseRepositoryPrisma implements IProductsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {
		super();
	}
	async getProducts(parameters: IProductFilter, characteristics: boolean = false): Promise<ProductsGetOrHTTPError> {
		const requestInDB = this.prismaService.client.productModel.findMany({
			where: parameters,
			include: {
				characteristics,
				// characteristics: true,
				dimensions: true,
			},
		});
		return await this.errorHandling(requestInDB, "ProductsRepository getProducts");
	}

	async createProduct(data: ProductCreatePrisma): Promise<ProductGetOrHTTPError> {
		const requestInDB = this.prismaService.client.productModel.create({
			data,
			include: { characteristics: true, dimensions: true },
		});
		return await this.errorHandling(requestInDB, "ProductsRepository addProduct");
	}

	async deleteProduct(userId: number, productId: number): Promise<ProductGetOrHTTPError> {
		const requestInDB = this.prismaService.client.productModel.delete({
			where: { id: productId },
			include: { characteristics: true, dimensions: true },
		});
		return await this.errorHandling(requestInDB, "ProductsRepository deleteProduct");
	}

	async changeCountProduct({ id, quantity: count }: IChangeCount): Promise<ProductGetOrHTTPError> {
		const requestInDB = this.prismaService.client.productModel.update({
			where: { id },
			data: {
				count: {
					increment: count,
				},
			},
			include: { characteristics: true, dimensions: true },
		});
		return await this.errorHandling(requestInDB, "ProductsRepository changeCountProduct");
	}

	//!----------------------------------------------------------------------------
}
