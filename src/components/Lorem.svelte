<script>
	import { onMount } from "svelte";
	import { waitFor, checkResponse } from "~/modules/fetching.js";

	let textPromise;
	const fetchDelay = 2000;

	onMount(async () => {
		// Fetch text from file after n milliseconds
		textPromise = waitFor(fetchDelay)
			.then(() => fetch("./lorem.txt"))
			.then(checkResponse)
			.then(result => result.text());
	});
</script>

<style type="text/scss">
	.error {
		color: red;
	}
</style>

<section>
	<h2>Promises</h2>
	{#if textPromise}
		{#await textPromise}
			<p>Fetching text in {fetchDelay} milliseconds</p>
		{:then text}
			<p>{text}</p>
		{:catch error}
			<p class="error">There was an issue loading the data: {error.status} {error.message}</p>
		{/await}
	{/if}
</section>
