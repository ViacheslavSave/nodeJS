import { IsBoolean, IsInt, IsString, ValidateIf } from "class-validator";
import { Product } from "@prisma/client";

export class AdminUpdateMobileDto {
	@IsInt()
	id: number;

	@ValidateIf((o: Product) => o.hasOwnProperty("brand"))
	@IsString()
	brand?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("model"))
	@IsString()
	model?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("VoWiFi"))
	@IsBoolean()
	VoWiFi?: boolean;

	@ValidateIf((o: Product) => o.hasOwnProperty("RAMCapacity"))
	@IsString()
	RAMCapacity?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("OSVersion"))
	@IsString()
	OSVersion?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("NumberOfSIMCards"))
	@IsInt()
	NumberOfSIMCards?: number;

	@ValidateIf((o: Product) => o.hasOwnProperty("FrontCamera"))
	@IsString()
	FrontCamera?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("BuiltInMemory"))
	@IsString()
	BuiltInMemory?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("MainCamera"))
	@IsString()
	MainCamera?: string;

	@ValidateIf((o: Product) => o.hasOwnProperty("added"))
	@IsInt()
	added?: number;
  
	@ValidateIf((o: Product) => o.hasOwnProperty("quantity"))
	@IsInt()
	quantity: number;
}
