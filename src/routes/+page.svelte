<script lang="ts">
	import { resolve } from '$app/paths';
	import LinkButton from '$lib/ui/button/link-button.svelte';
</script>

<svelte:head>
	<title>Reglet</title>
</svelte:head>
<main class="h-dvh w-full">
	<heading
		class="flex w-full flex-col items-start justify-start gap-1 bg-sunburst-500 pt-10"
	>
		<div
			class="mx-auto my-0 w-full max-w-140 border border-black px-8 py-4"
		>
			<h1 class="text-9xl font-bold tracking-tighter text-black">
				Reglet
			</h1>
			<div class="flex items-center justify-start gap-4">
				<p class="text-2xl text-black">reg&middot;let</p>
				<p class="text-2xl text-black">
					<strong>noun</strong>
				</p>
			</div>
		</div>
	</heading>
	<section>
		<div
			class=" mx-auto my-0 w-full max-w-140 border border-t-0 border-black px-8 py-4"
		>
			<ol class="mb-6 list-decimal">
				<li>a flat narrow architectural molding</li>
				<li>a strip of wood used like a lead between lines of type</li>
				<li class="marker:font-bold">
					<strong>an app to build type systems</strong>
				</li>
			</ol>
			<div>
				<LinkButton href={resolve('/new/initial')} label="Get Started" />
			</div>
		</div>
	</section>
</main>
