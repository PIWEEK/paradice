<script>
	import { onMount } from 'svelte';

	export let shareUrl;

	let textarea;

	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={shareUrl} bind:this={textarea}></textarea>

