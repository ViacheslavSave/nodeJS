import { homedir } from "os";
import { promises } from "fs";
import { join } from "path";

export const defaultSity = "moskva";
const filePath = join(homedir(), "weather-data.json");

export async function saveKeyValue(newData) {
	const data = await checkAndReturnData();
	await promises.writeFile(filePath, JSON.stringify({ ...data, ...newData }));
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
		try {
			const file = await promises.readFile(filePath);
			data = JSON.parse(file);
		} catch (error) {}
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
