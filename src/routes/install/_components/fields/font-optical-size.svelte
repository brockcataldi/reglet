<script lang="ts">
	import type { OpticalSize } from '$lib/types';

	type Props = {
		opticalSize: OpticalSize;
		familyIndex: number;
		faceIndex: number;
	};

	let { opticalSize = $bindable(), familyIndex, faceIndex }: Props = $props();
</script>

<fieldset>
	<legend>Optical Size</legend>
	<section>
		<div>
			<label for={`${familyIndex}-${faceIndex}-optical-size`}
				>Optical Size</label
			>
			<select
				bind:value={opticalSize}
				id={`${familyIndex}-${faceIndex}-optical-size`}
			>
				<option value="none">none</option>
				<option value="auto">auto</option>
			</select>
		</div>
	</section>
</fieldset>
