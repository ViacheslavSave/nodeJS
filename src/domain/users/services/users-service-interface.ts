import { UserModel } from "@prisma/client";
import { HTTPError } from "../../../errors/http-error-class";
import { UserChangeDataDto } from "../dto/user-change-data-user-dto";
import { UserLoginDto } from "../dto/user-login-dto";
import { UserRegisterDto } from "../dto/user-register-dto";

export interface IUsersService {
	changeDataUser: (registeredUser: UserModel, dataUser: UserChangeDataDto) => Promise<UserModel | HTTPError>;
	validateUser: (dto: UserLoginDto) => Promise<boolean | HTTPError>;
	getUserInfo: (email: string) => Promise<UserModel | null | HTTPError>;
	createUser: (data: UserRegisterDto, role: string) => Promise<UserModel | HTTPError>;
}
