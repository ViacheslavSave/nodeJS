import { UserModel } from "@prisma/client";
import { hash } from "bcryptjs";
import { inject, injectable } from "inversify";
import { IConfigService } from "../../../config/config-service-interface";
import { HTTPError } from "../../../errors/http-error-class";
import { TYPES } from "../../../types";
import { UserChangeDataDto } from "../dto/user-change-data-user-dto";
import { UserLoginDto } from "../dto/user-login-dto";
import { UserRegisterDto } from "../dto/user-register-dto";
import { IUsersRepository } from "../repository/users-repository-interface";
import { User } from "../user-entity";
import { IUsersService } from "./users-service-interface";

@injectable()
export class UsersService implements IUsersService {
	private readonly salt: number = Number(this.configService.get("SALT"));
	constructor(
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean | HTTPError> {
		const existedUser = await this.usersRepository.findUser(email);
		if (!existedUser) {
			return false;
		}
		if (existedUser instanceof HTTPError) {
			return existedUser;
		}
		const newUser = new User(existedUser.email, existedUser.name, existedUser.role, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null | HTTPError> {
		return await this.usersRepository.findUser(email);
	}

	async createUser({ email, name, password }: UserRegisterDto, role: string): Promise<UserModel | HTTPError> {
		const newUser = new User(email, name, role);
		await newUser.setPassword(password, Number(this.salt));
		return await this.usersRepository.createUser(newUser);
	}

	async changeDataUser(
		registeredUser: UserModel,
		{ email, password: newPassword, name }: UserChangeDataDto
	): Promise<UserModel | HTTPError> {
		let password = newPassword && (await hash(newPassword, this.salt));
		return await this.usersRepository.changeDataUser(registeredUser.id, {
			email,
			password,
			name,
		});
	}
}
