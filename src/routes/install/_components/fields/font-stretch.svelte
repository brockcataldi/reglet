<script lang="ts">
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
	<section>
		{#if typeof stretch === 'number'}
			<div>
				<label for={`${familyIndex}-${faceIndex}-stretch`}>Stretch</label>
				<input
					type="number"
					bind:value={stretch}
					id={`${familyIndex}-${faceIndex}-stretch`}
				/>
				<p>%</p>
			</div>
			<button onclick={onChangeToString}>Change to String</button>
		{:else}
			<div>
				<label for={`${familyIndex}-${faceIndex}-stretch`}>Stretch</label>
				<select bind:value={stretch} id={`${familyIndex}-${faceIndex}-stretch`}>
					<option value="ultra-condensed">ultra-condensed</option>
					<option value="extra-condensed">extra-condensed</option>
					<option value="condensed">condensed</option>
					<option value="semi-condensed">semi-condensed</option>
					<option value="normal">normal</option>
				</select>
			</div>
			<button onclick={onChangeToPercentage}>Change to Percentage</button>
		{/if}
	</section>
</fieldset>
