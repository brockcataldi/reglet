<script lang="ts">
	import { CircleAlert, Plus, Trash } from '@lucide/svelte';

	import {
		BREAKPOINT_ROW_ERRORS,
		validateBreakpointRows,
		validateBreakpoints
	} from '#lib/domain/project/validate-draft.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';

	const draft = project.draft;

	const fluid = $derived(draft.type === 'fluid');

	// problems with one breakpoint show on it; the rest go below the list
	const rowErrors = $derived(validateBreakpointRows(draft.breakpoints));
	const projectErrors = $derived(
		validateBreakpoints(draft.type, draft.breakpoints).filter(
			(error) => !BREAKPOINT_ROW_ERRORS.includes(error)
		)
	);

	// leave room past the widest breakpoint so its label fits
	const span = $derived(
		Math.max(...draft.breakpoints.map((bp) => bp.width || 0), 1) * 1.15
	);
	const at = (width: number) => `${((width || 0) / span) * 100}%`;
</script>

<svelte:head>
	<title>Breakpoints - Reglet</title>
</svelte:head>

<div class="w-full">
	<div class="relative mt-6 mb-10 h-8" aria-hidden="true">
		<div class="absolute inset-x-0 top-4 border-t border-black"></div>
		{#if fluid && draft.breakpoints.length === 2}
			<div
				class="absolute top-2 h-4 bg-sunburst-500"
				style:left={at(draft.breakpoints[0].width)}
				style:width={at(
					draft.breakpoints[1].width - draft.breakpoints[0].width
				)}
			></div>
		{/if}
		{#each draft.breakpoints as breakpoint, index (breakpoint.id)}
			<div class="absolute top-0 h-8" style:left={at(breakpoint.width)}>
				<span
					class="block h-8 border-l {rowErrors[index]?.name ||
					rowErrors[index]?.width
						? 'border-red-800'
						: 'border-black'}"
				></span>
				<span
					class="absolute -top-5 left-1 text-xs font-semibold whitespace-nowrap"
					>{breakpoint.name || '(unnamed)'}</span
				>
				<span
					class="absolute top-8 left-1 text-xs whitespace-nowrap text-neutral-600"
					>{breakpoint.width}px</span
				>
			</div>
		{/each}
	</div>

	<ol class="flex flex-col gap-2">
		{#each draft.breakpoints as breakpoint, index (breakpoint.id)}
			{@const root = index === 0 && !fluid}
			{@const errors = rowErrors[index] ?? {}}
			{@const nameId = `breakpoint-${breakpoint.id}-name`}
			{@const widthId = `breakpoint-${breakpoint.id}-width`}
			<li>
				<div class="flex items-end gap-2">
					<InlineField
						for={nameId}
						label="Breakpoint {index + 1}"
						variant={errors.name
							? 'error'
							: fluid
								? 'disabled'
								: 'default'}
						class="min-w-0 flex-1"
					>
						<input
							id={nameId}
							class={inlineControlClass}
							placeholder="ex. Desktop"
							disabled={fluid}
							aria-invalid={!!errors.name}
							aria-describedby={errors.name
								? `${nameId}-error`
								: undefined}
							bind:value={breakpoint.name}
						/>
					</InlineField>
					<InlineField
						for={widthId}
						label="Width"
						labelClass="w-auto"
						suffix="px"
						variant={errors.width
							? 'error'
							: root
								? 'disabled'
								: 'default'}
						class="w-52 shrink-0"
					>
						<input
							id={widthId}
							aria-label="{breakpoint.name ||
								`Breakpoint ${index + 1}`} width (px)"
							type="number"
							min="0"
							step="1"
							class={inlineControlClass}
							disabled={root}
							aria-invalid={!!errors.width}
							aria-describedby={errors.width
								? `${widthId}-error`
								: undefined}
							bind:value={breakpoint.width}
						/>
					</InlineField>
					{#if draft.type === 'standard'}
						<Button
							label="Remove"
							aria-label="Remove {breakpoint.name || 'breakpoint'}"
							icon={Trash}
							scheme="destructive"
							class={root ? 'invisible' : undefined}
							disabled={root}
							onclick={() => draft.removeBreakpoint(breakpoint.id)}
						/>
					{/if}
				</div>
				{#each [[nameId, errors.name], [widthId, errors.width]] as [id, error] (id)}
					{#if error}
						<p
							id={`${id}-error`}
							class="mt-1 flex items-center gap-2 text-sm text-red-800"
						>
							<CircleAlert class="size-4 shrink-0" />
							{error}
						</p>
					{/if}
				{/each}
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

	{#each projectErrors as error (error)}
		<p class="mt-2 flex items-center gap-2 text-sm text-red-800">
			<CircleAlert class="size-4 shrink-0" />
			{error}
		</p>
	{/each}
</div>
