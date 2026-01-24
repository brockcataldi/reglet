<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import type { Stretch } from '$lib/types';

	type Props = {
		stretch: Stretch;
		familyIndex: number;
		faceIndex: number;
	};

	let { stretch = $bindable(), familyIndex, faceIndex }: Props = $props();

	const onChangeToPercentage = () => {
		stretch = 100;
	};

	const onChangeToString = () => {
		stretch = 'normal';
	};
</script>

<fieldset>
	<legend>Stretch</legend>
	<div>
		{#if typeof stretch === 'number'}
			<Input
				id={`${familyIndex}-${faceIndex}-stretch`}
				label="Stretch Percentage"
				bind:value={stretch}
				type="number"
			/>
			<Button size="small" width="full" onclick={onChangeToString}
				>Change to String</Button
			>
		{:else}
			<Select
				id={`${familyIndex}-${faceIndex}-stretch`}
				label="Stretch String"
				bind:value={stretch}
			>
				<option value="normal">normal</option>
				<option value="ultra-condensed">ultra-condensed</option>
				<option value="extra-condensed">extra-condensed</option>
				<option value="condensed">condensed</option>
				<option value="semi-condensed">semi-condensed</option>
				<option value="expanded">expanded</option>
				<option value="extra-expanded">extra-expanded</option>
				<option value="ultra-expanded">ultra-expanded</option>
			</Select>
			<Button size="small" width="full" onclick={onChangeToPercentage}
				>Change to Percentage</Button
			>
		{/if}
	</div>
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
		align-items: flex-end;
		justify-content: space-between;
		width: 100%;
		gap: 0.5rem;
	}
</style>
