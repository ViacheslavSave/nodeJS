const EventEmitter = require("events");
const emitterOperationCalc = new EventEmitter();
const [_, __, str1, str2, operation] = process.argv;
const num1 = Number(str1);
const num2 = Number(str2);

emitterOperationCalc.on("add", (num1, num2) => console.log(num1 + num2));
emitterOperationCalc.on("subtract", (num1, num2) => console.log(num1 - num2));
emitterOperationCalc.on("multiply", (num1, num2) => console.log(num1 * num2));
emitterOperationCalc.on("divide", (num1, num2) => console.log(num1 / num2));

if (num1 && num2 && operation) {
	if (emitterOperationCalc.listenerCount(operation)) {
		emitterOperationCalc.emit(operation, num1, num2);
	} else {
		console.log(`Операции ${operation} не существует `);
	}
} else {
	console.log("Введены некорректные параметры ");
}
