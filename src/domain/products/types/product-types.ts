import { ProductModel, CharacteristicsModel, DimensionsModel } from "@prisma/client";
import { HTTPError } from "../../../errors/http-error-class";

export interface IProductFilter {
	price?: {
		gte?: number;
		lte?: number;
	};
	count?: {
		gte: number;
	};
	description?: {
		contains: string;
	};
	AND?: ICharacteristics[];
}

export interface ICharacteristics {
	characteristics: {
		some: {
			property: string;
			value: string;
		};
	};
}

export interface ProductGet extends ProductModel {
	characteristics: CharacteristicsModel[];
	dimensions: DimensionsModel | null;
}

export type ProductGetOrHTTPError = ProductGet | HTTPError;
export type ProductsGetOrHTTPError = ProductGet[] | HTTPError;

export interface ProductCreatePrisma
	extends Omit<ProductModel, "id" | "active" | "oldPrice" | "description" | "count"> {
	description?: string;
	oldPrice?: number;
	dimensions?: { create?: Omit<DimensionsModel, "id" | "productId"> };
	characteristics?: { create: Omit<CharacteristicsModel, "id" | "productId">[] };
}

export interface IChangeCount {
	id: number;
	quantity: number;
}
