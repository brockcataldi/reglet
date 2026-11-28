<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';
	import project from '#lib/stores/project.svelte.js';
	import { ArrowLeft, ArrowRight, Check } from '@lucide/svelte';

	import Button from '#lib/ui/button/button.svelte';
	import LinkButton from '#lib/ui/button/link-button.svelte';

	let { children } = $props();

	type NavigationStep = {
		display: boolean;
		slug: string;
		name: string;
		href: ResolvedPathname;
		nextOverride?: string;
		onClick?: () => void;
	};

	const allSteps: NavigationStep[] = [
		{
			display: true,
			slug: 'type',
			name: 'Type',
			href: resolve('new/type')
		},
		{
			display: true,
			slug: 'breakpoints',
			name: 'Breakpoints',
			href: resolve('new/breakpoints')
		},
		{
			display: true,
			slug: 'units',
			name: 'Units',
			href: resolve('new/units')
		},
		{
			display: true,
			slug: 'tags',
			name: 'Tags',
			href: resolve('new/tags')
		},
		{
			display: true,
			slug: 'stylesheets',
			name: 'Stylesheets',
			href: resolve('new/stylesheets')
		},
		{
			display: true,
			slug: 'overview',
			name: 'Overview',
			href: resolve('new/overview')
		},
		{
			display: false,
			slug: 'editor',
			name: 'Editor',
			href: resolve('editor'),
			nextOverride: 'Create',
			onClick: () => project.create()
		}
	];

	// projects without breakpoints have nothing to set up there
	const steps = $derived(
		allSteps.filter(
			(step) =>
				step.slug !== 'breakpoints' || project.draft.type !== 'static'
		)
	);

	const displayedSteps = $derived(steps.filter((step) => step.display));

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

	// creating over an existing project throws it away
	const nextScheme = $derived(
		nextStep?.onClick && project.exists ? 'destructive' : 'primary'
	);
</script>

<main class="min-h-dvh w-full">
	<header class="w-full bg-sunburst-500 pt-8">
		<div class="mx-auto my-0 w-full max-w-180 border border-black">
			<h1
				class="w-full px-8 pt-8 pb-4 text-6xl font-bold tracking-tighter text-black"
			>
				{steps[currentIndex]?.name}
			</h1>
		</div>
	</header>
	<div
		class="mx-auto flex w-full max-w-180 flex-col items-start justify-start gap-4 border border-t-0 border-black pt-4"
	>
		<section class="w-full px-8">
			{@render children?.()}
		</section>

		<section
			class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-8 pt-4 pb-8"
		>
			<div class="flex justify-start">
				{#if previousStep !== undefined}
					<LinkButton
						href={previousStep.href}
						label="Previous"
						icon={ArrowLeft}
					/>
				{:else}
					<span></span>
				{/if}
			</div>

			<nav aria-label="Steps">
				<ol class="flex flex-row">
					{#each displayedSteps as step, index (step.slug)}
						{@const number = String(index + 1).padStart(2, '0')}
						<li class="border-y border-r border-black first:border-l">
							{#if steps[currentIndex]?.slug === step.slug}
								<span
									aria-current="step"
									title={step.name}
									class="block bg-black px-2 py-1 font-mono text-sm text-white"
								>
									{number}
								</span>
							{:else}
								<a
									href={step.href}
									title={step.name}
									aria-label={step.name}
									class="block bg-white px-2 py-1 font-mono text-sm
									hover:bg-cobalt-500 hover:text-white
									focus-visible:bg-cobalt-500 focus-visible:text-white"
								>
									{number}
								</a>
							{/if}
						</li>
					{/each}
				</ol>
			</nav>

			<div class="flex justify-end">
				{#if nextStep !== undefined && nextStep.onClick && !project.draft.valid}
					<Button
						label={nextStep.nextOverride ?? nextStep.name}
						icon={Check}
						iconPosition="append"
						scheme={nextScheme}
						disabled
						title="Fix the issues in the overview first"
						class="cursor-not-allowed opacity-60"
					/>
				{:else if nextStep !== undefined}
					<LinkButton
						href={nextStep.href}
						label={nextStep.nextOverride ?? nextStep.name}
						icon={nextStep.onClick ? Check : ArrowRight}
						iconPosition="append"
						scheme={nextScheme}
						onclick={nextStep.onClick}
					/>
				{:else}
					<span></span>
				{/if}
			</div>
		</section>
	</div>
</main>
