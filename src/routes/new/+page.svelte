<script>
	import Button from '$lib/ui/button/Button.svelte';
	import RadioCard from '$lib/ui/form/RadioCard.svelte';

	let type = $state('standard');
	let unit = $state('rem');
</script>

<main class="grid min-h-dvh place-items-center">
	<div
		class="flex w-full max-w-140 flex-col items-start justify-start gap-4 border border-black p-8"
	>
		<h1 class="text-6xl font-bold tracking-tighter">New Project</h1>

		<div>
			<h2 class="font-mono text-sm text-neutral-400 uppercase">Project Type</h2>
			<hr class="my-2 text-neutral-400" />
			<div class="grid grid-cols-2 gap-2">
				<RadioCard value="standard" bind:group={type}>
					<span class="block font-semibold">Standard</span>
					<span class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
				</RadioCard>
				<RadioCard value="fluid" bind:group={type}>
					<span class="block font-semibold">Fluid</span>
					<span class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
				</RadioCard>
			</div>
		</div>

		<div>
			<h2 class="font-mono text-sm text-neutral-400 uppercase">Unit</h2>
			<hr class="my-2 text-neutral-400" />
			<div class="grid grid-cols-3 gap-2">
				<RadioCard value="rem" bind:group={unit}>
					<span class="block font-semibold">rem</span>
					<span class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
				</RadioCard>
				<RadioCard value="px" bind:group={unit}>
					<span class="block font-semibold">px</span>
					<span class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
				</RadioCard>
				<RadioCard value="pt" bind:group={unit}>
					<span class="block font-semibold">pt</span>
					<span class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
				</RadioCard>
			</div>
		</div>

		<div class="flex w-full flex-row items-center justify-end">
			<Button>Next Step</Button>
		</div>
	</div>
</main>
