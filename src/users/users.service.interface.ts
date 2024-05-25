import { UserModel } from "@prisma/client";
import { UserLoginDto } from "./dto/user-login.dto";

export interface IUserService {
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
