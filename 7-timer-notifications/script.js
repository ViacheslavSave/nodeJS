const timer = require("../../3_stageStartWorkNodejs/4-timer/script");
const notifier = require("node-notifier");
const callback = () => {
	notifier.notify({
		title: "My notification",
		message: "Hello, there!",
	});
};

timer(callback);
