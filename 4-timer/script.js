(() => {
	const [_, __, ...rest] = process.argv;
	let time = rest.join(" ").match(/^(?:(\d+)h )(?:(\d+)m )(?:(\d+)s)$/);
	if (!time ) {
		console.log("Введены некорректные параметры");
		return;
	}
	let timeout = 0;
	if (time[1]) timeout += time[1] * 60 * 60 * 1000;
	if (time[2]) timeout += time[2] * 60 * 1000;
	if (time[3]) timeout += time[3] * 1000;
  
	console.log(`таймер установлен`);
	timeout && setTimeout(() => {
		console.log(`время прошло`);
	}, timeout);
})();