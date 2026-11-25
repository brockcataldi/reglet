<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import NavigationItem from './_layout-components/NavigationItem.svelte';

	let { children } = $props();

	let routeId = $derived(page.route.id ?? '');

	type Item = { id: string; href: string; label: string };

	const sections: (Item & { pages: Item[] })[] = [
		{
			id: '/(app)/editor',
			href: resolve('/(app)/editor/specimen'),
			label: 'Editor',
			pages: [
				{
					id: '/(app)/editor/specimen',
					href: resolve('/(app)/editor/specimen'),
					label: 'Specimen'
				},
				{
					id: '/(app)/editor/tag',
					href: resolve('/(app)/editor/tag'),
					label: 'Tags'
				}
			]
		},
		{
			id: '/(app)/preview',
			href: resolve('/(app)/preview/home'),
			label: 'Preview',
			pages: [
				{
					id: '/(app)/preview/home',
					href: resolve('/(app)/preview/home'),
					label: 'Home'
				},
				{
					id: '/(app)/preview/article',
					href: resolve('/(app)/preview/article'),
					label: 'Article'
				},
				{
					id: '/(app)/preview/blog',
					href: resolve('/(app)/preview/blog'),
					label: 'Blog'
				}
			]
		}
	];

	const utilities: Item[] = [
		{
			id: '/(app)/settings',
			href: resolve('/(app)/settings'),
			label: 'Settings'
		},
		{
			id: '/(app)/export',
			href: resolve('/(app)/export'),
			label: 'Export'
		}
	];

	const inSection = (id: string) =>
		routeId === id || routeId.startsWith(`${id}/`);

	let section = $derived(sections.find((s) => inSection(s.id)));
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
				<nav aria-label="Main">
					<ul class="flex flex-row">
						{#each sections as item (item.id)}
							<li class="w-fit">
								<NavigationItem
									href={item.href}
									border="r"
									active={inSection(item.id)}
									current={routeId === item.id}
								>
									{item.label}
								</NavigationItem>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
			<ul class="flex flex-row">
				{#each utilities as item (item.id)}
					<li class="w-fit">
						<NavigationItem
							href={item.href}
							border="l"
							active={routeId === item.id}
						>
							{item.label}
						</NavigationItem>
					</li>
				{/each}
			</ul>
		</div>
		{#if section}
			<nav
				class="border-t border-t-black"
				aria-label={`${section.label} pages`}
			>
				<ul class="flex flex-row">
					{#each section.pages as item (item.id)}
						<li class="w-fit">
							<NavigationItem
								href={item.href}
								border="r"
								active={routeId === item.id}
							>
								{item.label}
							</NavigationItem>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</header>

	<main
		class={[
			'relative min-h-dvh w-full',
			section ? 'mt-[4.5625rem]' : 'mt-9'
		]}
	>
		{@render children?.()}
	</main>
</div>
