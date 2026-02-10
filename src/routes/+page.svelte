<script lang="ts">
	import { resolve } from '$app/paths';

	import LinkButton from '$lib/components/link-button.svelte';
</script>

<main class="flex h-dvh w-full items-center justify-center p-4">
	<div class="w-full max-w-xl">
		<h1 class="text-5xl font-bold">reglet</h1>
		<p class="mb-4 text-2xl">reg&middot;let</p>

		<ol class="mb-4 list-inside list-decimal">
			<li class="text-md mb-1">a flat narrow architectural molding</li>
			<li class="text-md mb-1">
				a strip of wood used like a lead between lines of type
			</li>
			<li class="text-md mb-1">
				<strong>a typography sizing and spacing system</strong>
			</li>
		</ol>

		<menu>
			<LinkButton href={resolve('/project')}>New Project</LinkButton>
		</menu>
	</div>
</main>
