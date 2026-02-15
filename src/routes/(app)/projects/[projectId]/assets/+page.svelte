<script lang="ts">
	import AppShell from '$lib/components/dashboard/AppShell.svelte';
	import AssetGrid from '$lib/components/dashboard/AssetGrid.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<AppShell projectName={data.project.name}>
	<section class="toolbar" aria-label="Asset controls">
		<div class="toolbar-left">
			<p class="project-title">{data.project.name}</p>
			<p class="project-subtitle">{data.assets.length} assets</p>
		</div>

		<form method="GET" class="search-wrap">
			<label class="sr-only" for="asset-search">Search assets</label>
			<input
				id="asset-search"
				name="q"
				type="search"
				placeholder="Search title, material, dimensions"
				value={data.filters.q}
			/>
		</form>
	</section>

	<AssetGrid assets={data.assets} />
</AppShell>

<style>
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 18px;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 24px;
	}

	.toolbar-left {
		display: grid;
		gap: 3px;
	}

	.project-title {
		margin: 0;
		font-size: 1.1rem;
		letter-spacing: 0.01em;
		color: var(--text-primary);
	}

	.project-subtitle {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.search-wrap {
		min-width: min(100%, 320px);
	}

	input {
		width: 100%;
		background: transparent;
		border: 1px solid var(--border-soft);
		color: var(--text-primary);
		padding: 10px 11px;
		font: inherit;
	}

	input::placeholder {
		color: rgba(241, 241, 241, 0.75);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
