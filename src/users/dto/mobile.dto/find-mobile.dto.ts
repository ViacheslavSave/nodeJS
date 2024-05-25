import { IsString, Validate, ValidateIf } from "class-validator";
import { CustomCheckBoolean } from "../../../common/customCheckPropBoolean";

type query = Record<string, unknown>;

export class AdminFindMobileDto {
	@ValidateIf((o: query) => o.hasOwnProperty("id"))
	@IsString()
	id?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("brand"))
	@IsString()
	brand?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("model"))
	@IsString()
	model?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("VoWiFi"))
	@IsString()
	@Validate(CustomCheckBoolean)
	VoWiFi?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("RAMCapacity"))
	@IsString()
	RAMCapacity?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("OSVersion"))
	@IsString()
	OSVersion?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("NumberOfSIMCards"))
	@IsString()
	NumberOfSIMCards?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("FrontCamera"))
	@IsString()
	FrontCamera?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("BuiltInMemory"))
	@IsString()
	BuiltInMemory?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("MainCamera"))
	@IsString()
	MainCamera?: string;

	@ValidateIf((o: query) => o.hasOwnProperty("added"))
	@IsString()
	added?: string;
}
