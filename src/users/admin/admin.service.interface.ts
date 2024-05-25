import { Product, UserModel } from "@prisma/client";
import { AdminRegisterDto } from "../dto/admin-register.dto";
import { AdminCreateMobileDto } from "../dto/mobile.dto/create-mobile.dto";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { AdminUpdateMobileDto } from "../dto/mobile.dto/update-mobile.dto";

export interface IAdminService {
	createUser: (dto: AdminRegisterDto, role: string) => Promise<UserModel | null>;
	createProduct: (product: AdminCreateMobileDto, adminId: number) => Promise<Product | null>;
	deleteProduct: (idProduct: number) => Promise<Product | null>;
	updateProduct: (product: AdminUpdateMobileDto) => Promise<Product | null>;
	findProducts: (product: AdminFindMobileDto) => Promise<Product[] | null>;
	findProductCreate: (product: AdminCreateMobileDto) => Promise<Product[] | null>;
}
