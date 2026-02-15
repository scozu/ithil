<script lang="ts">
	import AssetGrid from '$lib/components/dashboard/AssetGrid.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<main class="share-page">
	<header class="share-header">
		<h1>Shared Project</h1>
		<p>Expires {new Date(data.share.expiresAt).toLocaleString()}</p>
	</header>

	<AssetGrid assets={data.assets} />
</main>

<style>
	.share-page {
		min-height: 100dvh;
		background: var(--bg-app);
		padding: 24px;
	}

	.share-header {
		margin-bottom: 24px;
	}

	h1 {
		margin: 0 0 6px;
		font-size: 1.3rem;
		font-weight: 500;
	}

	p {
		margin: 0;
		color: var(--text-muted);
	}
</style>
