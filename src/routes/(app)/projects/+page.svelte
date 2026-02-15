<script lang="ts">
	import AppShell from '$lib/components/dashboard/AppShell.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<AppShell projectName="Projects">
	<h1>Projects</h1>
	<ul>
		{#each data.projects as project}
			<li>
				<a href={`/app/projects/${project.id}/assets`}>{project.name}</a>
			</li>
		{/each}
	</ul>
</AppShell>

<style>
	h1 {
		margin: 0 0 12px;
		font-size: 1.3rem;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 8px;
	}

	a {
		display: block;
		border: 1px solid var(--border-soft);
		padding: 10px;
	}
</style>
