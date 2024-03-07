import axios from "axios";
import { printError, printSuccess } from "./log.service.js";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.servise.js";
import { arrlanguage } from "./lang.service.js";
const defaultLang = arrlanguage[0];
const dictionary = {
	inSity: {
		ru: "В городе",
		en: "In the sity of",
	},
};
// key:T5MJUZYG6LQ7Y3W7NGESDXSPZ
export const errors = {
	[TOKEN_DICTIONARY.token]: "не задан ключ API,задайте его через команду -t [API_KEY]",
	[TOKEN_DICTIONARY.arrSity]: "Не задан город, задайте его через команду -s [SITY]",
	// [TOKEN_DICTIONARY.language]: "Не задан язык, задайте его через команду -l [LANGUAGE]",
};
export async function getWeather({ sity, token, language }) {
	const { data } = await axios.get(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${sity}/today`,
		{
			params: {
				key: token,
				unitGroup: "metric",
				lang: language,
				include: "current",
			},
		}
	);
	return data;
}

export async function getForecast({ sity, token, language }) {
	try {
		const weather = await getWeather({ sity, token, language });
		return weather;
	} catch (e) {
		const errCodeAxios = e?.response?.status;
		const errDataAxios = e?.response?.data;
		if (errCodeAxios == 400) {
			// printError("формат API неверен или указан недопустимый параметр или комбинация параметров.");
			printError(errDataAxios);
		} else if (errCodeAxios == 401) {
			printError("возникла проблема с ключом API, учетной записью или подпиской.");
		} else if (errCodeAxios == 404) {
			printError("запрос не может быть сопоставлен ни с одной допустимой структурой конечной точки запроса API.");
		} else {
			printError(e.message);
		}
		return null;
	}
}

export async function getForecastALLsity() {
	const { language } = await getKeyValue([TOKEN_DICTIONARY.language]);
	const resData = await getKeyValue([TOKEN_DICTIONARY.token, TOKEN_DICTIONARY.arrSity]);
	const check = Object.entries(resData).reduce((acc, [key, value]) => {
		if (!value?.length) {
			printError(errors[key]);
			return false;
		}
		return acc;
	}, true);
  
	if (!check) {
		return;
	}

	const { token, arrSity } = resData;
	const responseAll = await Promise.all(arrSity.map((sity) => getForecast({ sity, token, language })));
	for (const value of responseAll) {
		if (!value) {
			continue;
		}
		const {
			currentConditions: { temp, conditions },
			address,
		} = value;
		console.log(`${dictionary.inSity[language || defaultLang]} ${address} ${temp}° ${conditions}`);
	}
}
