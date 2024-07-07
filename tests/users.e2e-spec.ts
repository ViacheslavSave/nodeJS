import { App } from "../src/app";
import { boot } from "../src/main";
import request from "supertest";

let application: App;
beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe("Users e2e", () => {
	it("REgister- error", async () => {
		const res = await request(application.app).post("/users/register").send({ email: "a@a.ru", password: "123" });
		expect(res.statusCode).toBe(422);
	});

	it("login-success", async () => {
		const res = await request(application.app).post("/users/login").send({ email: "a@a.mail", password: "123" });
		expect(res.statusCode).toBe(200);
		expect(res.body.jwt).not.toBeUndefined();
	});

	it("login-error", async () => {
		const res = await request(application.app).post("/users/login").send({ email: "a@a.mail", password: "1234" });
		expect(res.statusCode).toBe(401);
		expect(res.body.err).toBe("ошибка авторизации");
	});

	it("headOfWarehouse-success", async () => {
		const req = await request(application.app).post("/users/login").send({ email: "a@a.mail", password: "123" });
		const jwt = req.body.jwt;
		expect(jwt).not.toBeUndefined();
		const res = await request(application.app)
			.post("/users/headOfWarehouse")
			.set("Authorization", `Bearer ${jwt}`)
			.send({ email: "headOfWarehouse1@a.mail", password: "123", name: "headOfWarehouse" });
      expect(res.statusCode).toBe(201);
		expect(res.body.id).not.toBeUndefined();
		expect(res.body.email).not.toBeUndefined();
		expect(res.body.password).not.toBeUndefined();
		expect(res.body.name).not.toBeUndefined();
		expect(res.body.role).not.toBeUndefined();
	});

	it("headOfWarehouse-error-not-admin", async () => {
		const req = await request(application.app).post("/users/login").send({ email: "h@1.ru", password: "h@1.ru" });
		const jwt = req.body.jwt;
		expect(jwt).not.toBeUndefined();

		const res = await request(application.app)
			.post("/users/headOfWarehouse")
			.set("Authorization", `Bearer ${jwt}`)
			.send({ email: "headOfWarehouse1@a.mail", password: "123", name: "headOfWarehouse" });

		expect(res.statusCode).toBe(404);
		expect(res.body.message).not.toBe("not found");
	});
});

afterAll(() => {
	application.close();
});
