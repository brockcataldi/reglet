<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	import { page } from '$app/state';
	import { cn } from '$lib/functions/utilities';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();

	const itemClass = cn('block rounded-md px-4 py-2');
</script>

<header class="fixed top-0 z-10 w-full bg-white p-2">
	<div class="flex flex-row items-center justify-between gap-2">
		<ul class="flex flex-row items-center justify-start">
			<li>
				<a
					class={cn(
						itemClass,
						page.url.pathname.includes('stylesheets') && 'bg-neutral-100'
					)}
					href={resolve('/project/stylesheets/')}>Stylesheets</a
				>
			</li>
			<li>
				<a
					class={cn(
						itemClass,
						page.url.pathname.includes('fonts') && 'bg-neutral-100'
					)}
					href={resolve('/project/fonts/')}>Fonts</a
				>
			</li>
			<li>
				<a
					class={cn(
						itemClass,
						page.url.pathname.includes('definitions') && 'bg-neutral-100'
					)}
					href={resolve('/project/definitions/')}>Definitions</a
				>
			</li>
			<li>
				<a
					class={cn(
						itemClass,
						page.url.pathname.includes('outline') && 'bg-neutral-100'
					)}
					href={resolve('/project/outline/')}>Outline</a
				>
			</li>
		</ul>
		<ul class="flex flex-row items-center justify-end gap-2">
			<li>
				<a
					class={cn(
						itemClass,
						page.url.pathname.includes('export') && 'bg-neutral-100'
					)}
					href={resolve('/project/export/')}>Export</a
				>
			</li>
		</ul>
	</div>
</header>
<div class="relative mt-14 min-h-[80dvh] w-full">
	{@render children()}
</div>
