<script>
	import { onMount } from "svelte";

	let worker, workerResponse;

	onMount(async () => {
		// Create and query worker
		const worker = new Worker("~/modules/test.worker.js", { type: "module" });
		
		worker.addEventListener("message", function(evt) {
			console.log(`Client got: ${evt.data}`);
			workerResponse = evt.data;
		});

		worker.postMessage("Sending message to worker");
	});
</script>

<style type="text/scss">
</style>

<section>
	<h2>Web workers</h2>
	{#if workerResponse}
		<p>Worker responded with "{workerResponse}"</p>
	{:else}
		<p>Waiting for worker response</p>
	{/if}
</section>
