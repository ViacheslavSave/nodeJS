const secInMin = 60;
const secInHour = secInMin * 60;
const [_, __, ...rest] = process.argv;

// timer(() => {
// 	console.log("время прошло");
// });

function timer(callback) {
	let res = rest.join("").match(/^(?:(\d+)h)(?:(\d+)m)(?:(\d+)s)$/);

	if (!res) {
		throw new Error("Введены некорректные параметры");
	}

	const [_q, hour, minutes, seconds] = res;
	let timeoutInSeconds = 0;
	timeoutInSeconds += Number(hour) * secInHour;
	timeoutInSeconds += Number(minutes) * secInMin;
	timeoutInSeconds += Number(seconds);

	console.log(`таймер установлен`);
	setTimeout(callback, timeoutInSeconds * 1000);
}
module.exports = timer;
