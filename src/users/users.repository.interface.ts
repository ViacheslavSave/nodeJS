import { Prisma, Product, UserModel } from "@prisma/client";
import { AdminUpdateMobileDto } from "./dto/mobile.dto/update-mobile.dto";
import { User } from "./user.entity";

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
	createProduct: (product: Omit<Product, "id">) => Promise<Product | null>;
	deleteProduct: (idProduct: number) => Promise<Product | null>;
	updateProduct: (key: number, product: Omit<AdminUpdateMobileDto, "id">) => Promise<Product | null>;
	findProducts: (product: Prisma.ProductWhereInput) => Promise<Product[] | null>;
}
