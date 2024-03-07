import { getForecast } from "./api.service.js";
import { printError, printSuccess } from "./log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./storage.servise.js";

export async function saveToken(token) {
	if (!token.length) {
		printError("Не передан токен");
		return;
	}
  if (!await getForecast({token,sity:'москва',language:'en'})) {
		return;
  }
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess("токен успешно сохранен");
	} catch (error) {
		printError(error.message);
	}
}