<script lang="ts">
	import type { Snippet } from 'svelte';

	let { projectName, children } = $props<{ projectName: string; children: Snippet }>();
	let navOpen = $state(false);

	const closeNav = () => {
		navOpen = false;
	};
</script>

<div class="app-shell">
	<header class="mobile-header">
		<button class="icon-btn" type="button" aria-label="Open navigation" onclick={() => (navOpen = true)}
			>☰</button
		>
		<p class="mobile-brand">ithil</p>
		<p class="mobile-project">{projectName}</p>
	</header>

	{#if navOpen}
		<button class="backdrop" type="button" aria-label="Close navigation" onclick={closeNav}></button>
	{/if}

	<aside class:open={navOpen} class="sidebar">
		<div>
			<p class="brand">ithil</p>
			<button class="new-project" type="button">New Project</button>
		</div>
	</aside>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.app-shell {
		min-height: 100dvh;
		background: var(--bg-app);
		color: var(--text-primary);
	}

	.mobile-header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--border-soft);
		background: var(--bg-sidebar);
		position: sticky;
		top: 0;
		z-index: 15;
	}

	.icon-btn {
		border: 1px solid var(--border-soft);
		background: transparent;
		color: var(--text-primary);
		padding: 4px 8px;
		font: inherit;
		cursor: pointer;
	}

	.mobile-brand {
		margin: 0;
		font-size: 1rem;
		text-transform: lowercase;
		letter-spacing: 0.01em;
	}

	.mobile-project {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-left: auto;
	}

	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		border: 0;
		padding: 0;
		z-index: 20;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 240px;
		padding: 32px 28px;
		background: var(--bg-sidebar);
		border-right: 1px solid var(--border-strong);
		z-index: 25;
		transform: translateX(-100%);
		transition: transform 150ms ease;
	}

	.sidebar.open {
		transform: translateX(0);
	}

	.brand {
		margin: 0 0 26px;
		font-size: 1.6rem;
		letter-spacing: -0.02em;
		text-transform: lowercase;
	}

	.new-project {
		background: transparent;
		border: 0;
		padding: 0;
		margin: 0;
		color: var(--text-primary);
		font-size: 1rem;
		cursor: pointer;
	}

	.content {
		padding: 22px;
	}

	@media (min-width: 1024px) {
		.mobile-header {
			display: none;
		}

		.backdrop {
			display: none;
		}

		.sidebar {
			transform: translateX(0);
			z-index: 5;
		}

		.content {
			padding: 26px 30px;
			margin-left: 240px;
			min-height: 100dvh;
			border-left: 1px solid var(--border-strong);
		}
	}
</style>
