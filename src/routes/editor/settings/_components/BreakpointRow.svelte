<script lang="ts">
	import { Trash2 } from '@lucide/svelte';

	import type { Breakpoint } from '#lib/types.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Input from '#lib/ui/form/input.svelte';

	type BreakpointRowProps = {
		breakpoint: Breakpoint;
		root: boolean;
		onRemove: () => void;
	};

	let { breakpoint, root, onRemove }: BreakpointRowProps = $props();

	const standard = $derived(project.type === 'standard');
	// fluid min/max keep their names; the root always starts at 0px
	const nameLocked = $derived(!standard);
	const widthLocked = $derived(standard && root);

	// undefined while not editing, so changes from elsewhere show through
	let name = $state<string>();
	let width = $state<number | null>();
	let error = $state<string>();

	const errorId = $derived(`breakpoint-${breakpoint.id}-error`);

	const revert = () => {
		name = undefined;
		width = undefined;
		error = undefined;
	};

	const commit = () => {
		const patch: Partial<{ name: string; width: number }> = {};

		if (name !== undefined && name.trim() !== breakpoint.name) {
			patch.name = name;
		}

		if (width !== undefined && width !== breakpoint.width) {
			if (width === null || !Number.isFinite(width)) {
				error = 'Breakpoints need a width.';
				return;
			}

			patch.width = width;
		}

		if (Object.keys(patch).length === 0) {
			revert();
			return;
		}

		error = project.breakpointError({
			update: {
				id: breakpoint.id,
				patch: { ...patch, name: patch.name?.trim() ?? breakpoint.name }
			}
		});

		if (error === undefined) {
			project.updateBreakpoint(breakpoint.id, patch);
			revert();
		}
	};

	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			commit();
		} else if (event.key === 'Escape') {
			revert();
		}
	};
</script>

<div class="grid grid-cols-[minmax(0,1fr)_8rem_auto] items-start gap-4">
	<div>
		<label
			for={`breakpoint-${breakpoint.id}-name`}
			class="font-mono text-xs text-neutral-600 uppercase"
			>Name<span class="sr-only"> of {breakpoint.name}</span></label
		>
		<Input
			id={`breakpoint-${breakpoint.id}-name`}
			class="text-xl font-bold"
			disabled={nameLocked}
			variant={nameLocked ? 'disabled' : error ? 'error' : 'default'}
			aria-invalid={error !== undefined}
			aria-describedby={error ? errorId : undefined}
			bind:value={() => name ?? breakpoint.name, (value) => (name = value)}
			onblur={commit}
			{onkeydown}
		/>
		{#if error}
			<p id={errorId} class="mt-1 font-mono text-xs text-red-800">
				{error}
			</p>
		{/if}
	</div>

	<div>
		<label
			for={`breakpoint-${breakpoint.id}-width`}
			class="font-mono text-xs text-neutral-600 uppercase"
			>Width<span class="sr-only"> of {breakpoint.name}</span> (px)</label
		>
		<Input
			id={`breakpoint-${breakpoint.id}-width`}
			type="number"
			min="0"
			step="1"
			class="text-xl font-bold"
			disabled={widthLocked}
			variant={widthLocked ? 'disabled' : error ? 'error' : 'default'}
			aria-invalid={error !== undefined}
			aria-describedby={error ? errorId : undefined}
			bind:value={
				() => (width === undefined ? breakpoint.width : width),
				(value) => (width = value)
			}
			onblur={commit}
			{onkeydown}
		/>
	</div>

	{#if standard && !root}
		<Button
			label="Remove"
			aria-label={`Remove ${breakpoint.name}`}
			icon={Trash2}
			scheme="destructive"
			size="sm"
			class="mt-5"
			onclick={onRemove}
		/>
	{:else if standard}
		<!-- keeps the root's fields lined up with the rows below -->
		<span class="w-[5.5rem]" aria-hidden="true"></span>
	{/if}
</div>
