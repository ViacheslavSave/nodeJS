import { IsInt } from "class-validator";

export class AddQuantityInProductDto {
	@IsInt()
	id: number;

	@IsInt()
	quantity: number;
}
