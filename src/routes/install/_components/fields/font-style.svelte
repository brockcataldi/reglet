<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import Select from '$lib/components/select.svelte';
	import type { Style } from '$lib/types';

	type Props = {
		style: Style;
		obliqueAngle?: number;
		familyIndex: number;
		faceIndex: number;
	};

	let {
		style = $bindable(),
		obliqueAngle = $bindable(),
		familyIndex,
		faceIndex
	}: Props = $props();

	const onChangeStyle = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		style = target.value as Style;

		if (style !== 'oblique') {
			obliqueAngle = undefined;
		}
	};
</script>

<fieldset>
	<legend>Style</legend>

	<div>
		<Select
			id={`${familyIndex}-${faceIndex}-style`}
			label="Style"
			bind:value={style}
			onchange={onChangeStyle}
		>
			<option value="normal">normal</option>
			<option value="italic">italic</option>
			<option value="oblique">oblique</option>
		</Select>
		{#if style === 'oblique'}
			{#if obliqueAngle !== undefined}
				<Input
					id={`${familyIndex}-${faceIndex}-oblique-angle`}
					label="Oblique Angle"
					bind:value={obliqueAngle}
					type="number"
				/>
				<Button
					size="small"
					width="full"
					onclick={() => (obliqueAngle = undefined)}>Remove Angle</Button
				>
			{:else}
				<Button size="small" width="full" onclick={() => (obliqueAngle = 0)}
					>Add Angle</Button
				>
			{/if}
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
