<script lang="ts">
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
	<section>
		<div>
			<label for={`${familyIndex}-${faceIndex}-style`}>Style</label>
			<select
				bind:value={style}
				id={`${familyIndex}-${faceIndex}-style`}
				onchange={onChangeStyle}
			>
				<option value="normal">normal</option>
				<option value="italic">italic</option>
				<option value="oblique">oblique</option>
			</select>
		</div>
		{#if style === 'oblique'}
			{#if obliqueAngle !== undefined}
				<div>
					<label for={`${familyIndex}-${faceIndex}-oblique-angle`}
						>Oblique Angle</label
					>
					<input
						type="number"
						bind:value={obliqueAngle}
						id={`${familyIndex}-${faceIndex}-oblique-angle`}
					/>
				</div>
				<button onclick={() => (obliqueAngle = undefined)}>Remove Angle</button>
			{:else}
				<button onclick={() => (obliqueAngle = 0)}>Add Angle</button>
			{/if}
		{/if}
	</section>
</fieldset>
