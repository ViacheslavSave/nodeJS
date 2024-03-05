const {workerData:{PartBigArr},parentPort}=require('worker_threads')
const bigTask=require('./bigTask')
parentPort.postMessage(bigTask(PartBigArr))