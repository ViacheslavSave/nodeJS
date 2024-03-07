import chalk from "chalk";
import dedent from "dedent";
export function printError(error) {
	console.log(chalk.bgRed("error " + error));
}
export function printSuccess(message) {
	console.log(chalk.bgGreen("success " + message));
}
export function printHelp() {
	console.log(dedent`${chalk.bgCyan("help")}
    Без параметров -вывод погоды
    -s [SITY] для установки города
    -d [SITY] для удаления города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    -l [LANGUAGE] для сохранения языка
`);
}
