import { Prisma, UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IAdminService } from "./admin.service.interface";
import { TYPES } from "../../types";
import { IConfigService } from "../../config/config.service.interface";
import { IUsersRepository } from "../users.repository.interface";
import { User } from "../user.entity";
import { AdminCreateMobileDto } from "../dto/mobile.dto/create-mobile.dto";
import { Product } from "@prisma/client";
import { AdminUpdateMobileDto } from "../dto/mobile.dto/update-mobile.dto";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { UserRegisterDto } from "../dto/user-register.dto";

@injectable()
export class AdminService implements IAdminService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {}

	async createUser({ email, name, password }: UserRegisterDto, role: string): Promise<UserModel | null> {
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		const newUser = new User(email, name, role);
		const salt = this.configService.get("SALT");
		await newUser.setPassword(password, Number(salt));
		return await this.usersRepository.create(newUser);
	}

	async deleteProduct(idProduct: number): Promise<Product | null> {
		return this.usersRepository.deleteProduct(idProduct);
	}

	async createProduct(product: AdminCreateMobileDto, adminId: number) {
		const data = await this.findProductCreate(product);
		if (!(data === null || data.length === 0)) {
			return null;
		}
		return this.usersRepository.createProduct({ ...product, added: adminId });
	}

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

	async findProductCreate(product: AdminCreateMobileDto) {
		console.log("findProductsCreate");
		const { quantity: _, ...rest } = product;

		const newProduct: Prisma.ProductWhereInput = rest;

		return this.usersRepository.findProducts(newProduct);
	}

	async updateProduct(product: AdminUpdateMobileDto) {
		const { id, ...data } = product;
		return this.usersRepository.updateProduct(id, data);
	}
}
