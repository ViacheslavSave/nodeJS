import { Product } from "@prisma/client";
import { AdminFindMobileDto } from "../dto/mobile.dto/find-mobile.dto";
import { AddQuantityInProductDto } from "../dto/mobile.dto/addQuantityInProduct.dto";

export interface IHeadOfWarehouseService {
	findProducts: (product: AdminFindMobileDto) => Promise<Product[] | null>;
	updateQuantityProduct: (product: AddQuantityInProductDto) => Promise<Product | null>;
}
