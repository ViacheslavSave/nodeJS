import { User } from "./user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { UserModel, Product, Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";
import { AdminUpdateMobileDto } from "./dto/mobile.dto/update-mobile.dto";

@injectable()
export class UserRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name, role }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({ data: { email, password, name, role } });
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	async createProduct(data: Omit<Product, "id">) {
		console.log(data, "data");
		return this.prismaService.client.product.create({ data });
	}

	async deleteProduct(idProduct: number): Promise<Product | null> {
		try {
			return await this.prismaService.client.product.delete({
				where: {
					id: idProduct,
				},
			});
		} catch (err) {
			return null;
		}
	}

	async updateProduct(id: number, data: Omit<AdminUpdateMobileDto, "id">) {
		try {
			return await this.prismaService.client.product.update({
				where: {
					id,
				},
				data,
			});
		} catch (err) {
			return null;
		}
	}

	async findProducts(product: Prisma.ProductWhereInput) {
		try {
			return await this.prismaService.client.product.findMany({
				where: product,
			});
		} catch (err) {
			return null;
		}
	}

	// async findProduct(idProduct: number) {
	// 	return this.prismaService.client.product.findUnique({
	// 		where: {
	// 			id: idProduct,
	// 		},
	// 	});
	// }
}
