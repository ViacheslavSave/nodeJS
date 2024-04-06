import axios from "axios";
import { getKeyValue, defaultSity, saveKeyValue } from "./storage.service.js";

export async function getWeather({ sity, token }) {
	const { data } = await axios.get(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${sity}/today`,
		{
			params: {
				key: token,
				unitGroup: "metric",
				lang: "ru",
				include: "current"
			}
		}
	);
	return data;
}
export async function sendWeatherInStr(querySity) {
	const { sity: fileSity, token } = await getKeyValue(["sity", "token"]);
	const sity = querySity || fileSity || defaultSity;
	const {
		address,
		currentConditions: { temp, conditions }
	} = await getWeather({ sity, token });
	sity !== fileSity && saveKeyValue({ sity });
	return `В городе ${address} температура ${temp}° ${conditions}`;
}
