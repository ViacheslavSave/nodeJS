import {
	ProductsGetOrHTTPError,
	ProductGetOrHTTPError,
	ProductCreatePrisma,
	IChangeCount,
} from "../types/product-types";

export interface IProductsRepository {
	getProducts: (parameters: object) => Promise<ProductsGetOrHTTPError>;
	createProduct(product: ProductCreatePrisma): Promise<ProductGetOrHTTPError>;
	deleteProduct(userId: number, productId: number): Promise<ProductGetOrHTTPError>;
	changeCountProduct(data: IChangeCount): Promise<ProductGetOrHTTPError>;
}
