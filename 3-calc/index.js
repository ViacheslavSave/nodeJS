
const [_, __, stringWithNumber_1, stringWithNumber_2, operation] = process.argv;
const num_1 = Number(stringWithNumber_1);
const num_2 = Number(stringWithNumber_2);

const objOperations = {
	multiply: "multiply",
	divide: "divide",
	add: "add",
	subtract: "subtract",
};

if (!num_1 || !num_2) {
	throw new Error("неверно указаны числа");
}

if (!objOperations[operation]) {
	throw new Error("неверно указанa операция");
}
console.log(require(`./${objOperations[operation]}`)(num_1, num_2));
