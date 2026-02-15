<script lang="ts">
	import type { AssetListItem } from '$lib/shared/contracts';

	let { asset } = $props<{ asset: AssetListItem }>();
</script>

<article class="asset-card">
	<div class="asset-thumb-wrap">
		<img class="asset-thumb" src={asset.thumbnailUrl} alt={asset.title} loading="lazy" />
	</div>
	<div class="asset-meta">
		<p class="meta-line title"><span>{asset.title}</span>{asset.year ? `, ${asset.year}` : ''}</p>
		<p class="meta-line">{asset.materials ?? 'Materials'}</p>
		<p class="meta-line">{asset.dimensions ?? 'Dimensions'}</p>
	</div>
</article>

<style>
	.asset-card {
		border: 1px solid var(--border-soft);
		background: var(--bg-panel);
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.asset-thumb-wrap {
		border: 1px solid var(--border-soft);
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: #848484;
	}

	.asset-thumb {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(0.06) contrast(0.95);
	}

	.asset-meta {
		display: grid;
		gap: 2px;
	}

	.meta-line {
		margin: 0;
		font-size: 0.94rem;
		line-height: 1.2;
		color: var(--text-muted);
	}

	.title {
		font-style: italic;
		color: var(--text-primary);
	}
</style>
