const notifier = require("node-notifier");

(() => {
	const [_, __, ...rest] = process.argv;

	let res = rest.join(" ").match(/^(?:(\d+)h )?(?:(\d+)m )?(?:(\d+)s)?$/);
	if (!(res && res[0])) {
		console.log("Введены некорректные параметры ");
		return;
	}
	let timeout = 0;
	if (res[1]) timeout += res[1] * 60 * 60 * 1000;
	if (res[2]) timeout += res[2] * 60 * 1000;
	if (res[3]) timeout += res[3] * 1000;

	console.log(`таймер установлен`);
	setTimeout(() => {

	notifier.notify({
		title: "My notification",
		message: "Hello, there!",
    // звук не работает
		sound: true,
	});
	// console.log(`время прошло`);
	}, timeout);
})();
