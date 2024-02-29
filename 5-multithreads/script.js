const { Worker } = require("worker_threads");
const { performance, PerformanceObserver } = require("perf_hooks");
const { cpus } = require("os");
const bigTask = require("./bigTask");

const bigNum = 100_000;
const CountStreams = cpus().length;
const bigArrayNums = generateBigArrayNums();

const performanceObserver = new PerformanceObserver((items) => {
	const { name, duration } = items.getEntries().slice(-1)[0];
	console.log(`Время выполнения функции ${name} ${duration.toFixed(2)}`);
});
performanceObserver.observe({ entryTypes: ["function"] });

testNoWorker = performance.timerify(testNoWorker);
testWithWorker = performance.timerify(testWithWorker);

testNoWorker(bigArrayNums);
testWithWorker(bigArrayInParts(bigArrayNums));

function generateBigArrayNums() {
	let arrNumber = [];
	for (let index = 0; index < bigNum; index++) {
		arrNumber.push(index);
	}
	return arrNumber;
}

function testNoWorker(bigArray) {
	bigTask(bigArray);
}

function bigArrayInParts(arrNumber) {
	const lengthPart = Math.floor(arrNumber.length / CountStreams);
	const arrParts = [];
	for (let index = 0; index < CountStreams; index++) {
		const length = index != CountStreams - 1 ? lengthPart : arrNumber.length;
		arrParts.push(arrNumber.splice(0, length));
	}
	return arrParts;
}

function promWorker(part) {
	return new Promise((resolve) => {
		const worker = new Worker("./worker.js", { workerData: { PartBigArr: part } });
		worker.on("message", (res) => resolve(res));
	});
}

async function testWithWorker(arrParts) {
	const arrPromises = arrParts.map((part) => promWorker(part));
	return await Promise.all(arrPromises);
}
