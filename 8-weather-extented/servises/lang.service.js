import { printError, printSuccess } from "./log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./storage.servise.js";

export const arrlanguage = ["en", "ru"];

export async function addlanguage(lang) {
	if (!arrlanguage.includes(lang)) {
		printError("Язык не поддерживается");
		return;
	}
	saveKeyValue(TOKEN_DICTIONARY.language, lang);
	printSuccess("Язык сохранен");
}