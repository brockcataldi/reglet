<script lang="ts">
	import { type Weight, consolidateAxes, isAxisArray } from '$lib/types';
	import { isStringArray } from '$lib/functions/utilities';

	import profiles from '$lib/stores/profiles.svelte';

	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';

	type Props = {
		id: string;
		value: string;
		options: Weight[] | undefined;
	};

	let { id, value, options }: Props = $props();

	const weightId = $derived(`${id}-weight`);

	const config = $derived.by(() => {
		if (!options) {
			return null;
		}

		if (options.length === 1) {
			const w = options[0];
			return typeof w === 'string'
				? {
						type: 'select',
						options: [w],
						disabled: true
					}
				: {
						type: 'input',
						min: w.min,
						max: w.max,
						disabled: false
					};
		}

		if (isStringArray(options)) {
			return {
				type: 'select',
				options: options,
				disabled: false
			};
		}

		if (isAxisArray(options)) {
			const axis = consolidateAxes(options);
			return {
				type: 'input',
				min: axis.min,
				max: axis.max,
				disabled: false
			};
		}

		return null;
	});

	const onchangeWeight = (event: Event) => {
		const target = event.target as HTMLSelectElement | HTMLInputElement;
		profiles.updateStyles(id, { weight: target.value });
	};
</script>

{#if config?.type === 'select'}
	<Select
		id={weightId}
		label="Weight"
		{value}
		onchange={onchangeWeight}
		disabled={config.disabled}
	>
		<option disabled>Select a weight</option>
		{#each config.options as option (`${weightId}-${option}`)}
			<option value={option}>{option}</option>
		{/each}
	</Select>
{:else if config?.type === 'input'}
	<Input
		id={weightId}
		label="Weight"
		type="number"
		{value}
		oninput={onchangeWeight}
		min={config.min}
		max={config.max}
		description={`${config.min} to ${config.max}`}
	/>
{/if}
