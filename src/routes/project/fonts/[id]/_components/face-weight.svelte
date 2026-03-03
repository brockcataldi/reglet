<script lang="ts">
	import { isAxis } from '$lib/types';
	import fonts from '$lib/stores/fonts.svelte';

	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';

	import ArrowLeftRight from '$lib/icons/arrow-left-right.svelte';
	import Hashtag from '$lib/icons/hashtag.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.weight);

	const onchangeMin = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!isAxis(value)) {
			return;
		}

		fonts.updateWeight(familyId, faceId, {
			...value,
			min: Number(target.value)
		});
	};

	const onchangeMax = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!isAxis(value)) {
			return;
		}

		fonts.updateWeight(familyId, faceId, {
			...value,
			max: Number(target.value)
		});
	};

	const onchange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		fonts.updateWeight(familyId, faceId, target.value);
	};

	const onclickValue = () => {
		if (typeof value === 'number') {
			return;
		}

		fonts.updateWeight(familyId, faceId, '400');
	};

	const onclickAxis = () => {
		if (isAxis(value)) {
			return;
		}

		fonts.updateWeight(familyId, faceId, { min: 100, max: 900 });
	};
</script>

{#if value}
	<div class="grid grid-cols-3 gap-2">
		{#if isAxis(value)}
			<Input
				id={`${faceId}-weight-min`}
				type="number"
				label="Font Weight Minimum"
				value={value.min}
				onchange={onchangeMin}
			/>
			<Input
				id={`${faceId}-weight-max`}
				type="number"
				label="Font Weight Maximum"
				value={value.max}
				onchange={onchangeMax}
			/>
		{:else}
			<Input
				id={`${faceId}-weight`}
				type="text"
				label="Font Weight"
				{value}
				{onchange}
			/>
		{/if}

		<div class="flex w-full flex-col items-start justify-start gap-1">
			<p class="text-sm">Change to</p>
			{#if !isAxis(value)}
				<Button icon={ArrowLeftRight} onclick={onclickAxis}>Axis</Button>
			{:else}
				<Button icon={Hashtag} onclick={onclickValue}>Value</Button>
			{/if}
		</div>
	</div>
{/if}
