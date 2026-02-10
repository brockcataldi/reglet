<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	import type { LayoutData } from './$types';

	import fonts from '$lib/stores/fonts.svelte';
	import Plus from '$lib/icons/plus.svelte';

	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	let { children, data }: Props = $props();
</script>

<div class="flex flex-row">
	<aside
		class="absolute top-0 flex h-screen w-64 flex-col border-r border-black bg-white"
	>
		<header class="flex flex-row items-center justify-between p-2">
			<p class="text-2xl font-bold">Installed Fonts</p>

			<button
				class="grid h-9 w-9 place-items-center rounded-4xl border border-black"
			>
				<Plus />
				<span class="sr-only"> Add Another Font </span>
			</button>
		</header>
		<ul>
			{#each fonts.families as family (family.id)}
				<li class="w-full">
					<a
						href={resolve(`/project/fonts/${family.id}`)}
						class={`text-l block w-full border-b border-black px-4 py-2  ${data.id === family.id ? 'bg-black font-bold text-white' : 'bg-white'}`}
					>
						{family.family}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<div class="ml-64 w-[calc(100%-calc(var(--spacing)*64))]">
		{@render children()}
	</div>
</div>
