function bigTask(bigArray) {
	return bigArray.reduce((acc, num) => (num % 3 == 0 ? ++acc : acc), 0);
}
module.exports = bigTask;
