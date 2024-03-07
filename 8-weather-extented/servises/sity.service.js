import { errors, getForecast } from "./api.service.js";
import { printError, printSuccess } from "./log.service.js";
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./storage.servise.js";

export async function saveSity(sity) {
	if (!sity.length) {
		printError("Не передан город");
		return;
	}

	if (!(await checkSity(sity))) {
		return;
	}

	const { arrSity } = await getKeyValue([TOKEN_DICTIONARY.arrSity]);
	if (!arrSity) {
		await saveKeyValue(TOKEN_DICTIONARY.arrSity, [sity]);
	} else if (arrSity.includes(sity)) {
		printError("город уже записан");
	} else {
		arrSity.push(sity);
		await saveKeyValue(TOKEN_DICTIONARY.arrSity, arrSity);
		printSuccess("город успешно сохранен");
	}
}

export async function deleteSity(sity) {
	if (!sity.length) {
		printError("Не передан город");
		return;
	}
	try {
		const { arrSity } = await getKeyValue([TOKEN_DICTIONARY.arrSity]);
		console.log(arrSity);
		if (!arrSity?.length) {
			printError("Нет городов в базе");
			return;
		}
		const index = arrSity.indexOf(sity);
		if (index === -1) {
			printError("нет такого города");
		} else {
			arrSity.splice(index, 1);
			await saveKeyValue(TOKEN_DICTIONARY.arrSity, arrSity);
			printSuccess("город успешно удален");
		}
	} catch (error) {
		printError(error.message);
	}
}

export async function checkSity(sity) {
	const { token, language } = await getKeyValue([TOKEN_DICTIONARY.token, TOKEN_DICTIONARY.language]);
	if (!token) {
		printError(errors[TOKEN_DICTIONARY.token]);
		return;
	}
	return !!(await getForecast({ sity, token, language: language || defaultLang }));
}
