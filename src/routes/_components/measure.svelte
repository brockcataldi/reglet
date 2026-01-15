<script lang="ts">
	import MeasureLine from './measure-line.svelte';

	const fontSize = 96;

	let baseline = $state(65);
	let capHeight = $state(0);
	let ascender = $state(0);
	let descender = $state(0);
	let xHeight = $state(0);

	let metrics = $derived({
		ascender: (baseline - ascender) / fontSize,
		capHeight: (baseline - capHeight) / fontSize,
		xHeight: (baseline - xHeight) / fontSize,
		descender: (descender - baseline) / fontSize
	});

	let canvas = $state<HTMLDivElement | null>(null);
</script>

<div class="measure">
	<div class="measure__canvas" bind:this={canvas}>
		<p class="measure__canvas__text">Hxpd</p>

		<MeasureLine label="Cap Height" bind:position={capHeight} align="left" />
		<MeasureLine label="Ascender" bind:position={ascender} align="right" />
		<MeasureLine label="X-Height" bind:position={xHeight} align="left" />
		<MeasureLine label="Baseline" bind:position={baseline} align="right" />
		<MeasureLine label="Descender" bind:position={descender} align="left" />
	</div>
</div>

<pre>
    {JSON.stringify(metrics, null, 2)}
</pre>

<style>
	.measure {
		width: 500px;
		height: 100%;
		position: relative;
	}

	.measure__canvas {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.measure__canvas__text {
		font-size: 96px;
		line-height: 1;
		margin: 0;
		border-top: 1px dotted black;
		border-bottom: 1px dotted black;
		text-align: center;
	}
</style>
