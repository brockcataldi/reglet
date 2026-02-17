<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';
	import ArrowLeftRight from '$lib/icons/arrow-left-right.svelte';
	import Hashtag from '$lib/icons/hashtag.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import fonts from '$lib/stores/fonts.svelte';
	import { isVariationAxis, isVariationAxisValue } from '$lib/types';

	type Props = {
		familyId: string;
		faceId: string;
		variationId: string;
	};

	let { familyId, faceId, variationId }: Props = $props();

	let value = $derived(
		fonts.getVariationSetting(familyId, faceId, variationId)
	);

	const onchangeName = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!value) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			...value,
			name: target.value
		});
	};

	const onchangeMin = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!value || isVariationAxisValue(value)) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			...value,
			min: Number(target.value)
		});
	};

	const onchangeMax = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!value || isVariationAxisValue(value)) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			...value,
			max: Number(target.value)
		});
	};

	const onchangeValue = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!value || isVariationAxis(value)) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			...value,
			value: Number(target.value)
		});
	};

	const onclickDelete = () => {
		fonts.deleteVariationSetting(familyId, faceId, variationId);
	};

	const onclickValue = () => {
		if (!value || isVariationAxisValue(value)) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			id: value.id,
			name: value.name,
			value: value.min
		});
	};

	const onclickAxis = () => {
		if (!value || isVariationAxis(value)) {
			return;
		}

		fonts.updateVariationSetting(familyId, faceId, variationId, {
			id: value.id,
			name: value.name,
			min: value.value,
			max: value.value
		});
	};
</script>

{#if value}
	<div class="mb-2 grid grid-cols-5 items-end gap-2">
		<Input
			id={`${variationId}-name`}
			label="Name"
			type="text"
			value={value.name}
			onchange={onchangeName}
		/>

		{#if isVariationAxis(value)}
			<Input
				id={`${variationId}-min`}
				label="Min Value"
				type="number"
				value={value.min}
				onchange={onchangeMin}
			/>
			<Input
				id={`${variationId}-max`}
				label="Max Value"
				type="number"
				value={value.max}
				onchange={onchangeMax}
			/>
		{:else}
			<Input
				id={`${variationId}-value`}
				label="Value"
				type="number"
				value={value.value}
				onchange={onchangeValue}
			/>
		{/if}

		<div class="flex w-full flex-col items-start justify-start gap-1">
			<p class="text-sm">Change to</p>
			{#if isVariationAxis(value)}
				<Button icon={Hashtag} onclick={onclickValue} width="full">Value</Button
				>
			{:else}
				<Button icon={ArrowLeftRight} onclick={onclickAxis} width="full"
					>Axis</Button
				>
			{/if}
		</div>
		<Button icon={Trash} color="destructive" onclick={onclickDelete}>
			Delete
		</Button>
	</div>
{/if}
