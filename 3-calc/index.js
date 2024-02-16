const [_, __, str1, str2, operation] = process.argv;
const num1= Number(str1)
const num2= Number(str2)
if (num1 && num2 && operation) {
	switch (operation) {
		case "multiply":
		case "divide":
		case "add":
		case "subtract":
			console.log(require(`./${operation}`)(num1, num2));
			break;

		default:
			console.log(`Операции ${operation} не существует `);
	}
} else {
	console.log("Введены некорректные параметры ");
}
