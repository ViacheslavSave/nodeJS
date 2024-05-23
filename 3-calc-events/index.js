const EventEmitter = require("events");
const emitterOperationCalc = new EventEmitter();

emitterOperationCalc.on("add", (num1, num2) => console.log(num1 + num2));
emitterOperationCalc.on("subtract", (num1, num2) => console.log(num1 - num2));
emitterOperationCalc.on("multiply", (num1, num2) => console.log(num1 * num2));
emitterOperationCalc.on("divide", (num1, num2) => console.log(num1 / num2));

const [_, __, stringWithNumber_1, stringWithNumber_2, operation] = process.argv;
const num_1 = Number(stringWithNumber_1);
const num_2 = Number(stringWithNumber_2);

if (!num_1 || !num_2) {
	throw new Error("неверно указаны числа");
}

if (!emitterOperationCalc.listenerCount(operation)) {
	throw new Error("неверно указанa операция");
}

emitterOperationCalc.emit(operation, num_1, num_2);

