<script lang="ts">
	import type { Stretch } from '$lib/types';
	import fonts from '$lib/stores/fonts.svelte';
	import Select from '$lib/components/select.svelte';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';

	import Hashtag from '$lib/icons/hashtag.svelte';
	import Bold from '$lib/icons/bold.svelte';

	type Props = {
		familyId: string;
		faceId: string;
	};

	let { familyId, faceId }: Props = $props();

	let value = $derived(fonts.getFace(familyId, faceId)?.stretch);

	const onchangeSelect = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		fonts.updateStretch(familyId, faceId, target.value as Stretch);
	};

	const onchangeNumber = (event: Event) => {
		const target = event.target as HTMLInputElement;
		fonts.updateStretch(familyId, faceId, Number(target.value));
	};

	const onclickString = () => {
		fonts.updateStretch(familyId, faceId, 'normal');
	};

	const onclickPercentage = () => {
		fonts.updateStretch(familyId, faceId, 100);
	};
</script>

{#if value}
	<div class="grid grid-cols-[repeat(2,180px)] items-end gap-2">
		{#if typeof value === 'number'}
			<Input
				label="Font Stretch"
				id={`${faceId}-stretch`}
				{value}
				onchange={onchangeNumber}
			/>

			<Button onclick={onclickString}>
				<Bold />
			</Button>
		{:else}
			<Select
				label="Font Stretch"
				id={`${faceId}-stretch`}
				{value}
				onchange={onchangeSelect}
			>
				<option value="normal">normal</option>
				<option value="ultra-condensed">ultra-condensed</option>
				<option value="extra-condensed">extra-condensed</option>
				<option value="condensed">condensed</option>
				<option value="semi-condensed">semi-condensed</option>
				<option value="expanded">expanded</option>
				<option value="extra-expanded">extra-expanded</option>
				<option value="ultra-expanded">ultra-expanded</option>
			</Select>

			<Button onclick={onclickPercentage}>
				<Hashtag />
			</Button>
		{/if}
	</div>
{/if}
