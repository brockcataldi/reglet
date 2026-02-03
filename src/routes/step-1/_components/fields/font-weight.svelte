<script lang="ts">
	import { type Axis, type Weight, isAxis } from '$lib/types';

	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';

	type Props = {
		weight: Weight;
		familyIndex: number;
		faceIndex: number;
	};

	let { weight = $bindable(), familyIndex, faceIndex }: Props = $props();

	const handleChangeToAxis = () => {
		if (isAxis(weight)) {
			return;
		}

		if (typeof weight === 'number') {
			weight = {
				min: weight,
				max: weight
			} as Axis;
		} else {
			weight = {
				min: 100,
				max: 900
			} as Axis;
		}
	};

	const handleChangeToString = () => {
		if (typeof weight === 'string') {
			return;
		}

		if (typeof weight === 'number') {
			if (weight < 499) {
				weight = 'normal';
			} else {
				weight = 'bold';
			}
		} else {
			weight = 'normal';
		}
	};

	const handleChangeToNumeric = () => {
		if (typeof weight === 'number') {
			return;
		}

		if (typeof weight === 'string') {
			if (weight === 'normal') {
				weight = 400;
			} else {
				weight = 700;
			}
		} else {
			weight = weight.min as number;
		}
	};
</script>

<fieldset>
	<legend>Weight</legend>
	{#if isAxis(weight)}
		<div>
			<Input
				id={`${familyIndex}-${faceIndex}-weight-min`}
				label="Axis Minimum"
				bind:value={weight.min}
			/>
			<Input
				id={`${familyIndex}-${faceIndex}-weight-max`}
				label="Axis Maximum"
				bind:value={weight.max}
			/>
		</div>
		<div>
			<Button size="small" width="full" onclick={handleChangeToString}
				>Change to String</Button
			>
			<Button size="small" width="full" onclick={handleChangeToNumeric}
				>Change to Numeric</Button
			>
		</div>
	{:else if weight === 'normal' || weight === 'bold'}
		<div>
			<Select
				id={`${familyIndex}-${faceIndex}-weight-string`}
				label="Weight String"
				bind:value={weight}
			>
				<option value="normal">normal</option>
				<option value="bold">bold</option>
			</Select>
		</div>
		<div>
			<Button size="small" width="full" onclick={handleChangeToAxis}
				>Change to Axis</Button
			>
			<Button size="small" width="full" onclick={handleChangeToNumeric}
				>Change to Numeric</Button
			>
		</div>
	{:else}
		<div>
			<Input
				id={`${familyIndex}-${faceIndex}-weight-numeric`}
				label="Weight Value"
				bind:value={weight}
				type="number"
			/>
		</div>
		<div>
			<Button size="small" width="full" onclick={handleChangeToAxis}
				>Change to Axis</Button
			>
			<Button size="small" width="full" onclick={handleChangeToString}
				>Change to String</Button
			>
		</div>
	{/if}
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	legend {
		font-family: var(--ff-ss);
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	div {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 0.5rem;
	}
</style>
