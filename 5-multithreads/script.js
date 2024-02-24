const { Worker } = require("worker_threads");

const { performance, PerformanceObserver } = require("perf_hooks");
const performanceObserver = new PerformanceObserver((items) => {
	const { name, duration } = items.getEntries().pop();
	console.log(`Время выполнения функции ${name} ${duration.toFixed(2)}`);
});
performanceObserver.observe({ entryTypes: ["function"] });
remDivision = performance.timerify(remDivision);
sendInWorker = performance.timerify(sendInWorker);
let arrNumber = [];
for (let index = 0; index < 100_000_000; index++) {
	arrNumber.push(index);
}
function remDivision(arr) {
	arr.reduce((acc, num) => (num % 3 == 0 ? ++acc : acc), 0);
}
remDivision(arrNumber);

//!----------------------------------------------------------------------------
const cores = 4;
const lengthPart = Math.floor(arrNumber.length / cores);
const arrParts = [];
for (let index = 0; index < cores; index++) {
	const length = index != cores - 1 ? lengthPart : arrNumber.length;
	arrParts.push(arrNumber.splice(0, length));
}

sendInWorker(arrParts);

async function sendInWorker(arrParts) {
	const arrPromises = [];
	for (let index = 0; index < arrParts.length; index++) {
		const promise = new Promise((resolve, reject) => {
			const worker = new Worker("./worker.js", { workerData: { arr: arrParts[index] } });
			worker.on("message", (res) => resolve(res));
		});
		arrPromises.push(promise);
	}
	await Promise.all(arrPromises);
}
