import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { IUsersRepository } from "../users.repository.interface";
import { Product } from "@prisma/client";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { IHeadOfWarehouseService } from "./headOfWarehouse.service.interface";
import { AddQuantityInProductDto } from "../dto/mobile.dto/addQuantityInProduct.dto";
@injectable()
export class HeadOfWarehouseService implements IHeadOfWarehouseService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {}

	async findProducts(product: AdminFindMobileDto) {
		const { id, VoWiFi, NumberOfSIMCards, added, ...rest } = product;
		const newProduct: Partial<Product> = rest;

		if (product.id) {
			newProduct.id = parseInt(product.id);
		}

		if (product.added) {
			newProduct.added = parseInt(product.added);
		}

		if (product.NumberOfSIMCards) {
			newProduct.NumberOfSIMCards = parseInt(product.NumberOfSIMCards);
		}

		if (product.VoWiFi === "true") {
			newProduct.VoWiFi = true;
		} else if (product.VoWiFi === "false") {
			newProduct.VoWiFi = false;
		}

		return this.usersRepository.findProducts(newProduct);
	}

	async updateQuantityProduct(product: AddQuantityInProductDto) {
		const result = await this.findProducts({ id: product.id.toString() });
		if (result !== null && result.length > 0) {
			result[0].quantity;
			return this.usersRepository.updateProduct(product.id, { quantity: result[0].quantity + product.quantity });
		}
		return null;
	}
}
