import { Transform, Type } from "class-transformer";
import { IsArray, ValidateIf, IsString, ValidateNested, IsNumber, IsBoolean } from "class-validator";

class Characteristics {
	@IsString()
	property: string;
	@IsString()
	value: string;
}

export class ProductFilterDto {
	@ValidateIf((ob) => ob.hasOwnProperty("priceMin"))
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	priceMin?: number;

	@ValidateIf((ob) => ob.hasOwnProperty("priceMax"))
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	priceMax?: number;

	@IsBoolean()
	availability: boolean;

	@ValidateIf((ob) => ob.hasOwnProperty("text"))
	@IsString()
	text?: string;

	@ValidateIf((ob) => ob.hasOwnProperty("characteristics"))
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Characteristics)
	characteristics?: Characteristics[];
}
