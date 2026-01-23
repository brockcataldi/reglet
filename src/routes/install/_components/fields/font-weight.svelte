<script lang="ts">
	import { isAxis, type Axis, type Weight } from '$lib/types';

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
	<section>
		{#if isAxis(weight)}
			<div>
				<label for={`${familyIndex}-${faceIndex}-weight-min`}
					>Axis Minimum</label
				>
				<input
					type="number"
					bind:value={weight.min}
					id={`${familyIndex}-${faceIndex}-weight-min`}
				/>
			</div>
			<div>
				<label for={`${familyIndex}-${faceIndex}-weight-max`}
					>Axis Maximum</label
				>
				<input
					type="number"
					bind:value={weight.max}
					id={`${familyIndex}-${faceIndex}-weight-max`}
				/>
			</div>
			<button onclick={handleChangeToString}>Change to String</button>
			<button onclick={handleChangeToNumeric}>Change to Numeric</button>
		{:else if weight === 'normal' || weight === 'bold'}
			<div>
				<label for={`${familyIndex}-${faceIndex}-weight-string`}
					>Weight String</label
				>
				<select
					bind:value={weight}
					id={`${familyIndex}-${faceIndex}-weight-string`}
				>
					<option value="normal">normal</option>
					<option value="bold">bold</option>
				</select>
			</div>
			<button onclick={handleChangeToAxis}>Change to Axis</button>
			<button onclick={handleChangeToNumeric}>Change to Numeric</button>
		{:else}
			<div>
				<label for={`${familyIndex}-${faceIndex}-weight-numeric`}
					>Weight Value</label
				>
				<input
					type="number"
					bind:value={weight}
					id={`${familyIndex}-${faceIndex}-weight-numeric`}
				/>
			</div>
			<button onclick={handleChangeToAxis}>Change to Axis</button>
			<button onclick={handleChangeToString}>Change to String</button>
		{/if}
	</section>
</fieldset>
