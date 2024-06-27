import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { HTTPError } from "../../../errors/http-error-class";
import { TYPES } from "../../../types";
import { ProductAddDto } from "../dto/product-create-dto";
import { ProductFilterDto } from "../dto/product-filter-dto";
import { IProductsRepository } from "../repository/products-repository-interface";
import {
	IChangeCount,
	ICharacteristics,
	IProductFilter,
	ProductCreatePrisma,
	ProductGetOrHTTPError,
	ProductsGetOrHTTPError,
} from "../types/product-types";
import { IProductsService } from "./products-service-interface";

@injectable()
export class ProductsService implements IProductsService {
	constructor(@inject(TYPES.IProductsRepository) private productsRepository: IProductsRepository) {}

	async getProducts({ priceMin, priceMax, text, characteristics }: ProductFilterDto): Promise<ProductsGetOrHTTPError> {
		const characteristicsFilter = characteristics?.reduce<ICharacteristics[]>((acc, { property, value }) => {
			const characteristics = {
				characteristics: {
					some: {
						property,
						value,
					},
				},
			};
			return [...acc, characteristics];
		}, []);

		const productFilter: IProductFilter = {
			price: {
				gte: priceMin,
				lte: priceMax,
			},
		};

		text && (productFilter.description = { contains: text });
		characteristicsFilter && (productFilter.AND = characteristicsFilter);
		return await this.productsRepository.getProducts(productFilter);
	}

	async createProduct(user: UserModel, product: ProductAddDto): Promise<ProductGetOrHTTPError> {
		const productValid: ProductCreatePrisma = {
			...product,
			userModelId: user.id,
			dimensions: { create: product.dimensions },
			characteristics: product.characteristics && { create: product.characteristics },
		};
		return this.productsRepository.createProduct(productValid);
	}

	async deleteProduct(userId: number, productId: number): Promise<ProductGetOrHTTPError> {
		return this.productsRepository.deleteProduct(userId, productId);
	}

	async changeCountProduct({ id, quantity: count }: IChangeCount): Promise<ProductGetOrHTTPError> {
		const product = await this.productsRepository.getProducts({ id });
		if (product instanceof HTTPError) {
			return product;
		}
		if (count >= -product[0].count) {
			return this.productsRepository.changeCountProduct({ id, quantity: count });
		}
		return new HTTPError(400, `Недостаточное количество.Доступно ${product[0].count}`);
	}
}
