import { IsEmail, IsString, Length } from "class-validator";

export class UserRegisterDto {
	@IsEmail({}, { message: "Неверно указан email" })
	email: string;

	@IsString({ message: "Не указан пароль" })
	@Length(3, 30, { message: "Пароль должно содержать от 3 до 15 символов" })
	password: string;

	@IsString({ message: "Не указано имя" })
	@Length(3, 15, { message: "Имя должно содержать от 3 до 15 символов" })
	name: string;
}
