import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "customText", async: false })
export class CustomCheckBoolean implements ValidatorConstraintInterface {
	validate(string: string, args: ValidationArguments) {
		return string === "true" || string === "false";
	}

	defaultMessage(args: ValidationArguments) {
		// here you can provide default error message if validation failed
		return "incorrect parameters";
	}
}
