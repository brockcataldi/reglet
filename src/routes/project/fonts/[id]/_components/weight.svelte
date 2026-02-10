<script lang="ts">
	import { isAxis, type Weight } from '$lib/types';
	import fonts from '$lib/stores/fonts.svelte';

	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';

	import ArrowLeftRight from '$lib/icons/arrow-left-right.svelte';
	import Hashtag from '$lib/icons/hashtag.svelte';
	import Bold from '$lib/icons/bold.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.weight);

	const onchangeSelect = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		fonts.updateWeight(familyId, faceId, target.value as Weight);
	};

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

	const onchangeNumber = (event: Event) => {
		const target = event.target as HTMLInputElement;
		fonts.updateWeight(familyId, faceId, Number(target.value));
	};

	const onclickString = () => {
		if (typeof value === 'string') {
			return;
		}

		fonts.updateWeight(familyId, faceId, 'normal');
	};

	const onclickNumber = () => {
		if (typeof value === 'number') {
			return;
		}

		fonts.updateWeight(familyId, faceId, 400);
	};
	const onclickAxis = () => {
		if (isAxis(value)) {
			return;
		}

		fonts.updateWeight(familyId, faceId, { min: 100, max: 900 });
	};
</script>

{#if value}
	<div class="grid grid-cols-[repeat(3,180px)] items-end gap-2">
		{#if typeof value === 'string'}
			<Select
				label="Font Weight"
				id={`${faceId}-weight`}
				{value}
				onchange={onchangeSelect}
			>
				<option value="normal">normal</option>
				<option value="bold">bold</option>
			</Select>
		{:else if isAxis(value)}
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
				type="number"
				label="Font Weight"
				{value}
				onchange={onchangeNumber}
			/>
		{/if}

		<div>
			{#if !isAxis(value)}
				<Button onclick={onclickAxis}>
					<ArrowLeftRight />
				</Button>
			{/if}

			{#if typeof value !== 'number'}
				<Button onclick={onclickNumber}>
					<Hashtag />
				</Button>
			{/if}

			{#if typeof value !== 'string'}
				<Button onclick={onclickString}>
					<Bold />
				</Button>
			{/if}
		</div>
	</div>
{/if}
