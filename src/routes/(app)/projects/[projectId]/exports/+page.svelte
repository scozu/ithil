<script lang="ts">
	import AppShell from '$lib/components/dashboard/AppShell.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<AppShell projectName={data.project.name}>
	<h1>Exports</h1>
	<p>This route is scaffolded and ready for PDF export queue and status UI.</p>
</AppShell>

<style>
	h1 {
		margin: 0 0 8px;
		font-size: 1.3rem;
	}

	p {
		margin: 0;
		color: var(--text-muted);
	}
</style>
