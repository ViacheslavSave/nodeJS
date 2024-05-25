import { IsEmail, IsString, Length } from "class-validator";

export class UserRegisterDto {

	@IsEmail({}, { message: "Невернo указан email" })
	email: string;

  @Length(5, 10)
	password: string;
  
	@IsString({ message: "Не указано имя" })
	name: string;

}
