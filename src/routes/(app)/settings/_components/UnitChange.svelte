<script lang="ts">
	import { ArrowRightLeft, Hash, X } from '@lucide/svelte';

	import type { FontSizeUnit, LetterSpacingUnit } from '#lib/types.js';
	import { adjustNumberPrecision } from '#lib/domain/project/adjust-number-precision.js';
	import {
		canConvertLetterSpacing,
		convertFontSize,
		ROOT_FONT_SIZE_PX
	} from '#lib/domain/project/convert-units.js';

	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';

	export type PendingUnit =
		| { kind: 'fontSize'; to: FontSizeUnit }
		| { kind: 'letterSpacing'; to: LetterSpacingUnit };

	type UnitChangeProps = {
		pending: PendingUnit;
		onApply: (convert: boolean) => void;
		onCancel: () => void;
	};

	let { pending, onApply, onCancel }: UnitChangeProps = $props();

	const RELATIVE: LetterSpacingUnit[] = ['em', '%'];

	const from = $derived(
		pending.kind === 'fontSize'
			? project.fontSizeUnit
			: project.letterSpacingUnit
	);

	const canConvert = $derived(
		pending.kind === 'fontSize' ||
			canConvertLetterSpacing(project.letterSpacingUnit, pending.to)
	);

	// the first lane's base size, before and after
	const example = $derived.by(() => {
		const lane = project.lanes.lanes[0];

		if (pending.kind !== 'fontSize' || !lane) {
			return undefined;
		}

		const converted = adjustNumberPrecision(
			convertFontSize(lane.baseSize, project.fontSizeUnit, pending.to),
			project.precision
		);

		return `A base size of ${lane.baseSize}${project.fontSizeUnit} becomes ${converted}${pending.to}.`;
	});

	const notes = $derived.by(() => {
		if (pending.kind === 'fontSize') {
			const lines = [`Assumes a ${ROOT_FONT_SIZE_PX}px root font size.`];

			if (from === 'em' || pending.to === 'em') {
				lines.push(
					'em is converted like rem, as if every parent were at the root size.'
				);
			}

			return lines;
		}

		if (!canConvert) {
			return [
				'ch depends on the width of the font\'s "0", so these values can\'t be converted.'
			];
		}

		const fromRelative = RELATIVE.includes(project.letterSpacingUnit);
		const toRelative = RELATIVE.includes(pending.to);

		if (fromRelative && !toRelative) {
			return [
				"Converted values are fixed amounts at each specimen's current font size, so they stop scaling with the text."
			];
		}

		if (!fromRelative && toRelative) {
			return [
				'Converted values scale with the text from now on, starting from what they measure today.'
			];
		}

		return [];
	});

	const what = $derived(
		pending.kind === 'fontSize'
			? 'Base sizes and custom font sizes'
			: 'Custom letter spacing values'
	);
	const name = $derived(
		pending.kind === 'fontSize' ? 'font size' : 'letter spacing'
	);
</script>

<div class="w-full border border-black bg-white p-4">
	<h2 class="mb-2 text-2xl font-bold">
		Change the {name} unit from {from} to {pending.to}?
	</h2>

	<p class="mb-2 text-sm">
		{what} are numbers in {from}.
		{#if canConvert}
			Convert them to keep the type looking the same, or keep the numbers
			and read them as {pending.to}.
		{:else}
			Keep the numbers and read them as {pending.to}, or cancel.
		{/if}
	</p>

	{#if example && canConvert}
		<p class="mb-2 text-sm">{example}</p>
	{/if}

	{#each notes as note (note)}
		<p class="mb-2 text-sm text-neutral-600">{note}</p>
	{/each}

	<ul class="mt-4 flex flex-row justify-end gap-2">
		{#if canConvert}
			<li>
				<Button
					label="Convert"
					icon={ArrowRightLeft}
					scheme="primary"
					onclick={() => onApply(true)}
				/>
			</li>
		{/if}
		<li>
			<Button
				label="Keep Numbers"
				icon={Hash}
				onclick={() => onApply(false)}
			/>
		</li>
		<li>
			<Button
				scheme="destructive"
				label="Cancel"
				icon={X}
				onclick={() => onCancel()}
			/>
		</li>
	</ul>
</div>
