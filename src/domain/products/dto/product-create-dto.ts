import { IsArray, ValidateIf, IsObject, IsInt, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Characteristics {
	@IsString()
	property: string;
	@IsString()
	value: string;
}

class Dimensions {
	@IsInt()
	width: number;
	@IsInt()
	Height: number;
	@IsInt()
	Length: number;
}

export class ProductAddDto {
	@IsInt()
	price: number;

	@IsString()
	productName: string;

	@IsString()
	category: string;

	@ValidateIf((ob) => ob.hasOwnProperty("oldPrice"))
	@IsInt()
	oldPrice?: number;

	@ValidateIf((ob) => ob.hasOwnProperty("description"))
	@IsString()
	description?: string;

	@IsInt()
	weight: number;
	@ValidateIf((ob) => ob.hasOwnProperty("dimensions"))
	@IsObject()
	@ValidateNested()
	@Type(() => Dimensions)
	dimensions?: Dimensions;

	@ValidateIf((ob) => ob.hasOwnProperty("characteristics"))
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Characteristics)
	characteristics?: Characteristics[];
}
