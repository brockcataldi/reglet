<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import project from '$lib/stores/project.svelte';
	import NavigationItem from './_layout-components/NavigationItem.svelte';

	let { children } = $props();

	let pId = $derived(page.params.id);
	let rId = $derived(page.route.id);
</script>

<div class="h-dvh w-full">
	<header
		class="fixed top-0 left-0 z-10 w-full border-b border-b-black bg-white"
	>
		<div class="flex flex-row items-center justify-between">
			<div class="flex flex-row items-center justify-start">
				<div
					class="h-9 w-40 border-r border-r-black bg-sunburst-500 px-2 text-black"
				>
					<p class="text-3xl font-bold tracking-tighter">Reglet</p>
				</div>
				<nav>
					<ul class="flex flex-row">
						<li class="w-fit">
							<NavigationItem
								href={resolve('/editor/')}
								border="r"
								active={rId === '/editor'}
							>
								<span class="block font-mono text-sm font-bold">
									Settings
								</span>
							</NavigationItem>
						</li>
						{#each project.breakpoints.sorted as breakpoint (breakpoint.id)}
							<li class="w-fit">
								<NavigationItem
									href={resolve(`/editor/${breakpoint.id}`)}
									border="r"
									active={breakpoint.id === pId}
								>
									<span class="flex flex-row items-center gap-2">
										<span class="block font-mono text-sm font-bold">
											{#if breakpoint.label === ''}
												Needs Title
											{:else}
												{breakpoint.label}
											{/if}
										</span>
										<span class="block font-mono text-xs"
											>{breakpoint.width}px</span
										>
									</span>
								</NavigationItem>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
			<ul>
				<li>
					<NavigationItem
						href={resolve(`/editor/export`)}
						border="l"
						active={rId === '/editor/export'}
					>
						<span class="block font-mono text-sm font-bold"> Export </span>
					</NavigationItem>
				</li>
			</ul>
		</div>
	</header>

	<main class="relative mt-9 min-h-dvh w-full">
		{@render children?.()}
	</main>
</div>
