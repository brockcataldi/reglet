<script lang="ts">
	import { Check, X } from '@lucide/svelte';

	import type { Breakpoint } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';

	type BreakpointCreatorProps = {
		onCreate: (created: Breakpoint) => void;
		onCancel: () => void;
	};

	let { onCreate, onCancel }: BreakpointCreatorProps = $props();

	// suggest a width above the widest so the common case is just a name
	const widest = project.breakpoints.breakpoints.at(-1)?.width ?? 0;

	let name = $state('');
	let width = $state<number | null>(widest + 256);
	let error = $state<string>();

	const create = (event: SubmitEvent) => {
		event.preventDefault();

		if (width === null || !Number.isFinite(width)) {
			error = 'Breakpoints need a width.';
			return;
		}

		error = project.breakpointError({ add: { name: name.trim(), width } });

		if (error !== undefined) {
			return;
		}

		const created = project.addBreakpoint(name, width);

		if (created) {
			onCreate(created);
		}
	};
</script>

<form class="w-full border border-black bg-white p-4" onsubmit={create}>
	<div class="grid grid-cols-[minmax(0,1fr)_8rem] gap-4">
		<div>
			<Separator as="label" for="new-breakpoint-name">Name</Separator>
			<Input
				id="new-breakpoint-name"
				class="text-xl font-bold"
				placeholder="ex. Wide"
				variant={error ? 'error' : 'default'}
				aria-invalid={error !== undefined}
				aria-describedby={error ? 'new-breakpoint-error' : undefined}
				bind:value={name}
				oninput={() => (error = undefined)}
			/>
		</div>
		<div>
			<Separator as="label" for="new-breakpoint-width"
				>Width (px)</Separator
			>
			<Input
				id="new-breakpoint-width"
				type="number"
				min="0"
				step="1"
				class="text-xl font-bold"
				variant={error ? 'error' : 'default'}
				aria-invalid={error !== undefined}
				aria-describedby={error ? 'new-breakpoint-error' : undefined}
				bind:value={width}
				oninput={() => (error = undefined)}
			/>
		</div>
	</div>
	{#if error}
		<p id="new-breakpoint-error" class="mt-1 text-xs text-red-800">
			{error}
		</p>
	{/if}
	<ul class="mt-4 grid grid-cols-3 gap-4">
		<li></li>
		<li>
			<Button
				class="w-full py-2"
				type="submit"
				label="Create"
				icon={Check}
			/>
		</li>
		<li>
			<Button
				class="w-full py-2"
				scheme="destructive"
				label="Cancel"
				icon={X}
				onclick={() => onCancel()}
			/>
		</li>
	</ul>
</form>
