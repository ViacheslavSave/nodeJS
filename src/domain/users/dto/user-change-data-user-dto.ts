import { IsEmail, IsString, Length, ValidateIf } from "class-validator";

export class UserChangeDataDto {
	@ValidateIf((ob) => ob.hasOwnProperty("email"))
	@IsEmail({}, { message: "Неверно указан email" })
	email?: string;

	@ValidateIf((ob) => ob.hasOwnProperty("password"))
	@IsString({ message: "Не указан пароль" })
	@Length(3, 30, { message: "Пароль должен содержать от 3 до 15 символов" })
	password?: string;

	@ValidateIf((ob) => ob.hasOwnProperty("name"))
	@IsString({ message: "Не указано имя" })
	@Length(3, 15, { message: "Имя должно содержать от 3 до 15 символов" })
	name?: string;
}
