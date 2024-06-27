import { UserModel } from "@prisma/client";
import { HTTPError } from "../../../errors/http-error-class";
import { UserChangeDataDto } from "../dto/user-change-data-user-dto";
import { User } from "../user-entity";

export interface IUsersRepository {
	createUser: (user: User) => Promise<UserModel | HTTPError>;
	findUser: (email: string) => Promise<UserModel | null | HTTPError>;
	changeDataUser: (id: number, user: UserChangeDataDto) => Promise<UserModel | HTTPError>;
}
