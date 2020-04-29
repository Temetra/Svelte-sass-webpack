<script>
	import { onMount } from "svelte";

	let workerResponse, textPromise;

	const worker = new Worker('../modules/test.worker.js', { type: "module" });
	worker.addEventListener("message", function (evt) {
		console.log(`Client got: ${evt.data}`);
		workerResponse = evt.data;
	});

	const fetchDelay = 2000;

	onMount(() => {
		worker.postMessage("Sending message to worker");

		textPromise = new Promise(resolve => setTimeout(() => resolve(), fetchDelay))
			.then(() => fetch("./lorem.txt"))
			.then(result => result.text());
	});
</script>

<style type="text/scss">
	$title:("text":white, "background":darkslateblue);
	
	section { 
		margin:2rem;
	}
	
	h1 {
		padding:2rem;
		color:map-get($title, "text");
		background-color:map-get($title, "background");
	}
</style>

<h1>Title using Sass mapped colours</h1>

<section>
	<h2>Web workers</h2>
	{#if workerResponse}
		<p>Worker responded with "{workerResponse}"</p>
	{:else}
		<p>Waiting for worker response</p>
	{/if}
</section>

<section>
	<h2>Promises</h2>
	{#if textPromise}
		{#await textPromise}
			<p>Fetching text in {fetchDelay} milliseconds</p>
		{:then text}
			<p>{text}</p>
		{/await}
	{/if}
</section>
