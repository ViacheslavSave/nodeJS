import express from "express";
import bodyParser from "body-parser";
import { sendWeatherInStr } from "./services/api.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const app = express();
app.use(bodyParser.json());

const apiWeather = express.Router();
app.use("/api", apiWeather);

apiWeather.get("/getWeather", ({ query: { sity: querySity } }, res) => {
	sendWeatherInStr(querySity)
		.then((response) => res.send(response))
		.catch(() => res.status(500).send("ошибка запроса"));
});

apiWeather.post("/setToken", ({ body: { token } }, res) => {
	if (!token) {
		res.send("Не передан токен");
	}
	saveKeyValue({ token })
		.then(() => res.send("Токен успешно сохранен"))
		.catch(() => res.send("Ошибка сохранения токена"));
});

app.use((req, res) => res.status(404).send("Not found"));
app.use((err, req, res, next) => {
	res.status(500).send("Ошибка");
});

app.listen(8000, () => {
	console.log("start app");
});
