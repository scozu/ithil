<script lang="ts">
	import AppShell from '$lib/components/dashboard/AppShell.svelte';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
	let prompt = $state('');
	let response = $state('');
	let loading = $state(false);

	async function send() {
		loading = true;
		response = '';
		const res = await fetch('/api/ai/chat', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				projectId: data.project.id,
				message: prompt
			})
		});
		const payload = await res.json();
		response = payload.message?.content ?? 'No response';
		loading = false;
	}
</script>

<AppShell projectName={data.project.name}>
	<h1>AI</h1>
	<form
		class="chat"
		onsubmit={(event) => {
			event.preventDefault();
			if (prompt.trim()) void send();
		}}
	>
		<textarea bind:value={prompt} placeholder="Ask about this project's metadata"></textarea>
		<button type="submit" disabled={loading}>{loading ? 'Thinking...' : 'Send'}</button>
	</form>
	{#if response}
		<p class="reply">{response}</p>
	{/if}
</AppShell>

<style>
	h1 {
		margin: 0 0 12px;
		font-size: 1.3rem;
	}

	.chat {
		display: grid;
		gap: 8px;
		max-width: 720px;
	}

	textarea {
		min-height: 120px;
		padding: 10px;
		background: transparent;
		border: 1px solid var(--border-soft);
		color: var(--text-primary);
		font: inherit;
	}

	button {
		justify-self: start;
		background: transparent;
		border: 1px solid var(--border-soft);
		color: var(--text-primary);
		padding: 8px 12px;
		font: inherit;
	}

	.reply {
		margin-top: 14px;
		max-width: 720px;
		color: var(--text-muted);
	}
</style>
