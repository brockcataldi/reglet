<script lang="ts">
	import project from '#lib/stores/project.svelte.js';
	import {
		FONT_SIZE_UNITS,
		LETTER_SPACING_UNITS
	} from '#lib/domain/project/units.js';

	import Dialog from '#lib/ui/display/dialog.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';
	import Select from '#lib/ui/form/select.svelte';

	import UnitChange, { type PendingUnit } from './UnitChange.svelte';

	// the cards show the choice right away; the project only changes once
	// the dialog says whether to convert
	let fontSizeChoice = $state(project.fontSizeUnit);
	let letterSpacingChoice = $state(project.letterSpacingUnit);
	let pending = $state<PendingUnit>();

	const onFontSizeChange = () => {
		if (fontSizeChoice !== project.fontSizeUnit) {
			pending = { kind: 'fontSize', to: fontSizeChoice };
		}
	};

	const onLetterSpacingChange = () => {
		if (letterSpacingChoice === project.letterSpacingUnit) {
			return;
		}

		// nothing custom to convert, so nothing to ask
		if (!project.hasCustomLetterSpacing) {
			project.changeLetterSpacingUnit(letterSpacingChoice, false);
			return;
		}

		pending = { kind: 'letterSpacing', to: letterSpacingChoice };
	};

	const apply = (convert: boolean) => {
		if (pending?.kind === 'fontSize') {
			project.changeFontSizeUnit(pending.to, convert);
		} else if (pending?.kind === 'letterSpacing') {
			project.changeLetterSpacingUnit(pending.to, convert);
		}

		pending = undefined;
	};

	const cancel = () => {
		fontSizeChoice = project.fontSizeUnit;
		letterSpacingChoice = project.letterSpacingUnit;
		pending = undefined;
	};

	const PRECISIONS = [0, 1, 2, 3, 4, 5, 6];

	// a value saved outside the list still shows as chosen
	const precisions = $derived(
		PRECISIONS.includes(project.precision)
			? PRECISIONS
			: [...PRECISIONS, project.precision].sort((a, b) => a - b)
	);

	const example = $derived((4 / 3).toFixed(project.precision));
</script>

<section class="w-full border-black bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		<h2 class="mb-4 text-6xl font-bold tracking-tighter text-black">
			Units
		</h2>

		<div class="mb-8">
			<Separator as="h3" id="settings-font-size-unit"
				>Font Size Unit</Separator
			>
			<div
				role="radiogroup"
				aria-labelledby="settings-font-size-unit"
				class="grid grid-cols-2 gap-2"
			>
				{#each FONT_SIZE_UNITS as unit (unit.value)}
					<RadioCard
						name="settings-font-size-unit"
						value={unit.value}
						bind:group={fontSizeChoice}
						onchange={onFontSizeChange}
					>
						<span class="flex flex-col gap-1">
							<span class="text-2xl font-semibold">{unit.value}</span>
							<span class="text-sm">{unit.description}</span>
						</span>
					</RadioCard>
				{/each}
			</div>
		</div>

		<div class="mb-8">
			<Separator as="h3" id="settings-letter-spacing-unit"
				>Letter Spacing Unit</Separator
			>
			<div
				role="radiogroup"
				aria-labelledby="settings-letter-spacing-unit"
				class="grid grid-cols-3 gap-2"
			>
				{#each LETTER_SPACING_UNITS as unit (unit.value)}
					<RadioCard
						name="settings-letter-spacing-unit"
						value={unit.value}
						bind:group={letterSpacingChoice}
						onchange={onLetterSpacingChange}
					>
						<span class="flex flex-col gap-1">
							<span class="text-2xl font-semibold">{unit.value}</span>
							<span class="text-sm">{unit.description}</span>
						</span>
					</RadioCard>
				{/each}
			</div>
		</div>

		<div>
			<Separator as="label" for="settings-precision"
				>Decimal Places</Separator
			>
			<p class="mb-2 text-sm text-neutral-600">
				How far computed sizes are rounded in the editor, preview and
				exports. At this setting 1.33333 becomes {example}.
			</p>
			<Select
				id="settings-precision"
				class="w-1/3"
				value={String(project.precision)}
				onchange={(event) =>
					(project.precision = Number(event.currentTarget.value))}
			>
				{#each precisions as precision (precision)}
					<option value={String(precision)}>{precision}</option>
				{/each}
			</Select>
		</div>
	</div>

	<Dialog showModal={pending !== undefined} onClose={cancel}>
		{#if pending}
			<UnitChange {pending} onApply={apply} onCancel={cancel} />
		{/if}
	</Dialog>
</section>
