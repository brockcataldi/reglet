<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';
	import LinkButton from '$lib/ui/button/LinkButton.svelte';

	let { children } = $props();

	type NavigationStep = {
		display: boolean;
		slug: string;
		name: string;
		href: ResolvedPathname;
		nextOverride?: string;
	};

	const steps: NavigationStep[] = [
		{
			display: true,
			slug: 'initial',
			name: 'Initial',
			href: resolve('/new/initial')
		},
		{
			display: true,
			slug: 'stylesheets',
			name: 'Stylesheets',
			href: resolve('/new/stylesheets')
		},
		{
			display: true,
			slug: 'overview',
			name: 'Overview',
			href: resolve('/new/overview')
		},
		{
			display: false,
			slug: 'editor',
			name: 'Editor',
			href: resolve('/editor'),
			nextOverride: 'Create'
		}
	];

	const currentIndex = $derived(
		steps.findIndex((step) => step.href === page.url.pathname)
	);

	const previousStep: NavigationStep | undefined = $derived.by(() => {
		if (currentIndex - 1 < 0) {
			return;
		}

		return steps[currentIndex - 1];
	});

	const nextStep: NavigationStep | undefined = $derived.by(() => {
		if (currentIndex + 1 >= steps.length) {
			return;
		}

		return steps[currentIndex + 1];
	});
</script>

<main class="grid min-h-dvh place-items-center">
	<div
		class="flex w-full max-w-140 flex-col items-start justify-start gap-4 border border-black"
	>
		<header class="px-8 pt-8 pb-4">
			<h1 class="text-6xl font-bold tracking-tighter">New Project</h1>
		</header>

		<nav class="w-full border-b border-b-black px-8">
			<ul class="grid w-full grid-cols-4">
				{#each steps as step, index (step.slug)}
					{#if step.display}
						{#if currentIndex === index}
							<li class=" border-t border-r border-black first:border-l">
								<span
									class="block bg-black px-2 py-1 font-mono text-sm text-white"
								>
									{step.name}
								</span>
							</li>
						{:else}
							<li class="border-t border-r border-black first:border-l">
								<a
									href={step.href}
									class="block px-2 py-1 font-mono text-sm
									hover:bg-cobalt-500 hover:text-white
									focus-visible:bg-cobalt-500 focus-visible:text-white
								"
								>
									<span>
										{step.name}
									</span>
								</a>
							</li>
						{/if}
					{/if}
				{/each}
			</ul>
		</nav>

		<section class="w-full px-8">
			{@render children?.()}
		</section>

		<section
			class="flex w-full flex-row items-center justify-between px-8 pt-4 pb-8"
		>
			{#if previousStep !== undefined}
				<LinkButton href={previousStep.href} label="Previous" />
			{:else}
				<span></span>
			{/if}

			{#if nextStep !== undefined}
				<LinkButton href={nextStep.href} label={nextStep.nextOverride ?? 'Next'}
				></LinkButton>
			{:else}
				<span></span>
			{/if}
		</section>
	</div>
</main>
