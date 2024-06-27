import { compare, hash } from "bcryptjs";
export class User {
	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _role: string,
		private _passwordHash?: string
	) {}
	get email(): string {
		return this._email;
	}
	get name(): string {
		return this._name;
	}
	get passwordHash(): string | never {
		if (this._passwordHash) {
			return this._passwordHash;
		}
		throw new Error("Не задан хеш");
	}
	get role(): string {
		return this._role;
	}
	public async setPassword(password: string, salt: number): Promise<void> {
		this._passwordHash = await hash(password, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this.passwordHash);
	}
}
