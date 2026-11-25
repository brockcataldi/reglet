<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import NavigationItem from './_layout-components/NavigationItem.svelte';

	let { children } = $props();

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
								href={resolve('/(app)/editor/specimen')}
								border="r"
								active={routeId === '/(app)/editor/specimen'}
							>
								Specimen View
							</NavigationItem>
						</li>
						<li class="w-fit">
							<NavigationItem
								href={resolve('/(app)/editor/tag')}
								border="r"
								active={routeId === '/(app)/editor/tag'}
							>
								Tag View
							</NavigationItem>
						</li>
						<li class="w-fit">
							<NavigationItem
								href={resolve('/(app)/preview/article')}
								border="r"
								active={routeId === '/(app)/preview/article'}
							>
								Article Preview
							</NavigationItem>
						</li>
						<li class="w-fit">
							<NavigationItem
								href={resolve('/(app)/preview/blog')}
								border="r"
								active={routeId === '/(app)/preview/blog'}
							>
								Blog Preview
							</NavigationItem>
						</li>
						<li class="w-fit">
							<NavigationItem
								href={resolve('/(app)/preview/home')}
								border="r"
								active={routeId === '/(app)/preview/home'}
							>
								Home Preview
							</NavigationItem>
						</li>
					</ul>
				</nav>
			</div>
			<ul class="flex flex-row">
				<li class="w-fit">
					<NavigationItem
						href={resolve('/(app)/settings')}
						border="l"
						active={routeId === '/(app)/settings'}
					>
						Settings
					</NavigationItem>
				</li>
				<li class="w-fit">
					<NavigationItem
						href={resolve('/(app)/export')}
						border="l"
						active={routeId === '/(app)/export'}
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
