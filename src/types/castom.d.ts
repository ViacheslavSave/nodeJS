declare namespace Express {
	export interface Request {
		user: import("@prisma/client").UserModel | null;
	}
}
