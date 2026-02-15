<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--bg-app: #8a8a8a;
		--bg-sidebar: #838383;
		--bg-panel: #888888;
		--border-strong: #6f6f6f;
		--border-soft: #d3d3d3;
		--text-primary: #f1f1f1;
		--text-muted: #e1e1e1;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif;
		background: #1a1a1a;
		color: var(--text-primary);
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}
</style>
