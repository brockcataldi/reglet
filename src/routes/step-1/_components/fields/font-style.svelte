<script lang="ts">
	import type { Style } from '$lib/types';

	import Select from '$lib/components/select.svelte';

	type Props = {
		style: Style;
		familyIndex: number;
		faceIndex: number;
	};

	let { style = $bindable(), familyIndex, faceIndex }: Props = $props();

	const onChangeStyle = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		style = target.value as Style;
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
		</Select>
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
