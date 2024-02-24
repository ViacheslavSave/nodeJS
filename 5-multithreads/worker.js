const { workerData, parentPort } = require("worker_threads");
const res = workerData.arr.reduce((acc, num) => (num % 3 == 0 ? ++acc : acc), 0);
parentPort.postMessage(res);
