import { homedir } from "os";
import { promises } from "fs";
import { join } from "path";

const filePath = join(homedir(), "weather-data.json");

export const TOKEN_DICTIONARY = {
	token: "token",
	arrSity: "arrSity",
	language: "language",
};

export async function saveKeyValue(key, value) {
	const data = await checkAndReturnData();
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
}

export async function getKeyValue(arrProp) {
	const data = await checkAndReturnData();
	return arrProp.reduce((acc, prop) => {
		return { ...acc, [prop]: data[prop] || null };
	}, {});
}

async function checkAndReturnData() {
	let data = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}
	return data;
}

async function isExist(path) {
	try {
		await promises.stat(path);
		return true;
	} catch (error) {
		return false;
	}
}
