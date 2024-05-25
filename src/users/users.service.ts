import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { IUserService } from "./users.service.interface";
@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(existedUser.email, existedUser.name, existedUser.role, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return await this.usersRepository.find(email);
	}
}
