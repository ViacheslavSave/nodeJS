import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const client: PrismaClient = new PrismaClient();

const salt = process.env["SALT"];
if (!salt) {
	throw new Error("Не указан SALT в .env");
}
client.$connect();

hash("123", parseInt(salt), (err, passwordHash) => firstAdmin(passwordHash));

async function firstAdmin(passwordHash: string) {
	await client.userModel.createMany({
		data: [
			{
				email: "a@a.mail",
				password: passwordHash,
				name: "firstAdmin",
				role: "admin",
			},
			{ email: "a1@a.mail", password: passwordHash, name: "firstHeadOfWarehouse", role: "headOfWarehouse" },
		],
	});

	client.$disconnect();
}
