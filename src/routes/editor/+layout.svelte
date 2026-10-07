<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	// import project from '#lib/stores/project.svelte.js';
	import NavigationItem from './_layout-components/NavigationItem.svelte';

	let { children } = $props();

	// let pId = $derived(page.params.id);
	let routeId = $derived(page.route.id);
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
								href={resolve('/editor/grid')}
								border="r"
								active={routeId === '/editor/grid'}
							>
								Grid View
							</NavigationItem>
						</li>
						<li class="w-fit">
							<NavigationItem
								href={resolve('/editor/list')}
								border="r"
								active={routeId === '/editor/list'}
							>
								List View
							</NavigationItem>
						</li>
					</ul>
				</nav>
			</div>
			<ul class="flex flex-row">
				<li class="w-fit">
					<NavigationItem
						href={resolve('/editor')}
						border="l"
						active={routeId === '/editor'}
					>
						Settings
					</NavigationItem>
				</li>
				<li class="w-fit">
					<NavigationItem
						href={resolve(`editor/export`)}
						border="l"
						active={routeId === '/editor/export'}
					>
						Export
					</NavigationItem>
				</li>
			</ul>
		</div>
	</header>

	<main class="relative mt-9 min-h-dvh w-full">
		{@render children?.()}
	</main>
</div>
