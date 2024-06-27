import { IUsersRepository } from "./users-repository-interface";
import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { PrismaService } from "../../../database/prisma-service";
import { TYPES } from "../../../types";
import { User } from "../user-entity";
import { UserChangeDataDto } from "../dto/user-change-data-user-dto";
import { BaseRepositoryPrisma } from "../../../database/base-repository-prisma";
import { HTTPError } from "../../../errors/http-error-class";

@injectable()
export class UserRepository extends BaseRepositoryPrisma implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {
		super();
	}

	async createUser({ email, passwordHash, name, role }: User): Promise<UserModel | HTTPError> {
		const requestInDB = this.prismaService.client.userModel.create({
			data: { email, password: passwordHash, name, role },
		});
		return await this.errorHandling(requestInDB, "UserRepository createUser");
	}

	async changeDataUser(id: number, data: UserChangeDataDto): Promise<UserModel | HTTPError> {
		const requestInDB = this.prismaService.client.userModel.update({ where: { id }, data });
		return await this.errorHandling(requestInDB, "UserRepository changeDataUser");
	}

	async findUser(email: string): Promise<UserModel | null | HTTPError> {
		const requestInDB = this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
		return await this.errorHandling(requestInDB, "UserRepository findUser");
	}
}
