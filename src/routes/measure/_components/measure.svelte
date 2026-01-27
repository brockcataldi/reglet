<script lang="ts">
	import type { Unit } from '$lib/unit';
	import { toPx, toString } from '$lib/unit';
	import MeasureLine from './measure-line.svelte';

	const fontSize: Unit = { value: 320, unit: 'px' };

	let display = $state<HTMLParagraphElement | null>(null);

	let capHeight = $state(0);
	let ascender = $state(0);
	let xHeight = $state(0);
	let baseline = $state(65);
	let descender = $state(0);

	let metrics = $derived({
		ascender: (baseline - ascender) / toPx(fontSize),
		capHeight: (baseline - capHeight) / toPx(fontSize),
		xHeight: (baseline - xHeight) / toPx(fontSize),
		descender: (descender - baseline) / toPx(fontSize)
	});
</script>

<section class="measure">
	<div class="measure__canvas">
		<p
			class="measure__canvas__text"
			style="font-size: {toString(fontSize)};"
			bind:this={display}
		>
			Hxpd
		</p>
		<MeasureLine
			label="Cap Height"
			bind:position={capHeight}
			align="left"
			color="#800080"
		/>
		<MeasureLine
			label="Ascender"
			bind:position={ascender}
			align="right"
			color="#008080"
		/>
		<MeasureLine
			label="X-Height"
			bind:position={xHeight}
			align="left"
			color="#008000"
		/>
		<MeasureLine
			label="Baseline"
			bind:position={baseline}
			align="right"
			color="#FF00FF"
		/>
		<MeasureLine
			label="Descender"
			bind:position={descender}
			align="left"
			color="#FF0000"
		/>
	</div>
</section>
<pre>{JSON.stringify(metrics, null, 2)}</pre>

<style>
	.measure {
		width: 100%;
		height: 100%;
		position: relative;
		border: 1px solid green;
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
		border-top: 1px dotted var(--c-bla);
		border-bottom: 1px dotted var(--c-bla);
		text-align: center;
		pointer-events: none;
		user-select: none;
	}
</style>
