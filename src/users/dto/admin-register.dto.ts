import { IsEmail, IsString, Length } from "class-validator";

export class AdminRegisterDto {
	@IsEmail({}, { message: "Невернo указан email" })
	email: string;

	@Length(1, 10, { message: "Неверно указан пароль" })
	password: string;

	@IsString({ message: "Не указано имя" })
	name: string;
}
