<script lang="ts">
	import { Plus, Trash } from '@lucide/svelte';

	import { validateBreakpoints } from '#lib/domain/project/validate-draft.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Banner from '#lib/ui/display/banner.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import Input from '#lib/ui/form/input.svelte';

	const draft = project.draft;

	const fluid = $derived(draft.type === 'fluid');
	const errors = $derived(
		validateBreakpoints(draft.type, draft.breakpoints)
	);
</script>

<svelte:head>
	<title>Breakpoints - Reglet</title>
</svelte:head>

<div class="w-full">
	<ol class="flex flex-col gap-4">
		{#each draft.breakpoints as breakpoint, index (breakpoint.id)}
			{@const root = index === 0 && !fluid}
			<li
				class="flex flex-row items-end gap-4 border border-black bg-white p-4"
			>
				<div class="flex-1">
					<Separator as="label" for={`breakpoint-${breakpoint.id}-name`}
						>Name</Separator
					>
					<Input
						id={`breakpoint-${breakpoint.id}-name`}
						placeholder="ex. Desktop"
						disabled={fluid}
						variant={fluid ? 'disabled' : 'default'}
						bind:value={breakpoint.name}
					/>
				</div>
				<div class="w-32">
					<Separator as="label" for={`breakpoint-${breakpoint.id}-width`}
						>Width (px)</Separator
					>
					<Input
						id={`breakpoint-${breakpoint.id}-width`}
						type="number"
						min="0"
						step="1"
						disabled={root}
						variant={root ? 'disabled' : 'default'}
						bind:value={breakpoint.width}
					/>
				</div>
				{#if draft.type === 'standard'}
					<Button
						label="Remove"
						aria-label={`Remove ${breakpoint.name || 'breakpoint'}`}
						icon={Trash}
						scheme="destructive"
						disabled={root}
						class={root ? 'invisible' : undefined}
						onclick={() => draft.removeBreakpoint(breakpoint.id)}
					/>
				{/if}
			</li>
		{/each}
	</ol>

	{#if draft.type === 'standard'}
		<Button
			class="mt-4"
			icon={Plus}
			label="Add breakpoint"
			onclick={() => draft.addBreakpoint()}
		/>
	{/if}

	{#each errors as error (error)}
		<Banner scheme="destructive" class="mt-4">{error}</Banner>
	{/each}
</div>
