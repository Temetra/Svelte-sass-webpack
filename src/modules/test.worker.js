addEventListener("message", function (evt) {
	// Log request
	console.log(`Worker got: ${evt.data}`);

	// Send response in 2000 ms
	setTimeout(() => postMessage("Hello from worker"), 2000);
});
