<script lang="ts">
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import profiles from '$lib/stores/profiles.svelte';

	import {
		isVariationAxis,
		type VariationAxis,
		type VariationAxisValue,
		type VariationAxisValues
	} from '$lib/types';

	type Props = {
		id: string;
		value: VariationAxisValue | undefined;
		options: VariationAxis | VariationAxisValues;
	};

	let { id, value, options }: Props = $props();

	let variationSettingId = $derived(`${id}-variation-setting-${options.name}`);

	const onchange = (event: Event) => {
		const target = event.target as HTMLSelectElement | HTMLInputElement;

		if (value === undefined) {
			return;
		}

		profiles.updateVariationSetting(id, value.id, {
			...value,
			value: parseInt(target.value, 10)
		});
	};
</script>

{#if isVariationAxis(options)}
	<Input
		id={variationSettingId}
		type="number"
		label={options.name}
		value={value?.value}
		min={options.min}
		max={options.max}
		description={`${options.min} to ${options.max}`}
		{onchange}
	/>
{:else}
	<Select
		id={variationSettingId}
		label={options.name}
		value={value?.value}
		disabled={options.values.length === 1}
		{onchange}
	>
		{#each options.values as option (`${variationSettingId}-${option}`)}
			<option value={option}>{option}</option>
		{/each}
	</Select>
{/if}
