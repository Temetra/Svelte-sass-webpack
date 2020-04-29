addEventListener("message", function (evt) {
	console.log(`Worker got: ${evt.data}`);
	postMessage("Hello from worker");
});
