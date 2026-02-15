<script lang="ts">
	import AssetCard from './AssetCard.svelte';
	import type { AssetListItem } from '$lib/shared/contracts';

	let { assets } = $props<{ assets: AssetListItem[] }>();
</script>

{#if assets.length === 0}
	<div class="empty">
		<p>No assets yet.</p>
		<p>Upload files to populate this project.</p>
	</div>
{:else}
	<section class="grid" aria-label="Project assets">
		{#each assets as asset (asset.id)}
			<AssetCard {asset} />
		{/each}
	</section>
{/if}

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 24px;
		align-content: start;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1280px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.empty {
		border: 1px dashed var(--border-soft);
		padding: 24px;
		color: var(--text-muted);
	}

	.empty p {
		margin: 0 0 6px;
	}
</style>
