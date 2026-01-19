<script lang="ts">
	import {
		isFontFaceAxis,
		isFontFaceValue,
		type FontFaceProperty
	} from '$lib/font/font-face-properties';

	type Props = {
		property: FontFaceProperty;
		options: string[];
	};

	let { property, options }: Props = $props();
</script>

{#if isFontFaceAxis(property)}
	<select value={property.unit}>
		<option value="numeric">Numeric</option>
		<option value="percentage">Percentage</option>
	</select>
	<input type="number" value={property.min} />
	<input type="number" value={property.max} />
    <select value={property.variation ? 'true' : 'false'}>
        <option value="false">Use native property</option>
        <option value="true">Use font-variation-settings</option>
    </select>
{:else if isFontFaceValue(property)}
	<select value={property.unit}>
		<option value="numeric">Numeric</option>
		<option value="percentage">Percentage</option>
	</select>
	<input type="number" value={property.value} />
{:else}
	<select>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
{/if}
