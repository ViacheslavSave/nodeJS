import { IsBoolean,  IsInt,  IsString, ValidateIf } from "class-validator";

export class AdminCreateMobileDto {
	@IsString()
	brand: string;

	@IsString()
	model: string;

	@IsBoolean()
	VoWiFi: boolean;

	@IsString()
	RAMCapacity: string;

	@IsString()
	OSVersion: string;

	@IsInt()
	NumberOfSIMCards: number;

	@IsString()
	FrontCamera: string;

	@IsString()
	BuiltInMemory: string;

	@IsString()
	MainCamera: string;
  
  @ValidateIf((o: Record<string, unknown>) => o.hasOwnProperty("quantity"))
	@IsInt()
	quantity: number;
  
}

