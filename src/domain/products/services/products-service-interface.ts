import { UserModel } from "@prisma/client";
import { ProductAddDto } from "../dto/product-create-dto";
import { ProductFilterDto } from "../dto/product-filter-dto";
import { ProductsGetOrHTTPError, ProductGetOrHTTPError, IChangeCount } from "../types/product-types";

export interface IProductsService {
	getProducts: (filter: ProductFilterDto) => Promise<ProductsGetOrHTTPError>;
	createProduct: (user: UserModel, product: ProductAddDto) => Promise<ProductGetOrHTTPError>;
	deleteProduct: (userId: number, productId: number) => Promise<ProductGetOrHTTPError>;
	changeCountProduct(data: IChangeCount): Promise<ProductGetOrHTTPError>;
}
