<script lang="ts">
	import settings from '$lib/stores/settings.svelte';

	import {
		createBreakpointValidator,
		type CreateBreakpointData,
		type CreateBreakpointErrors,
		type OnCreateBreakpointData
	} from './create-breakpoint';

	import Button from '$lib/ui/button/button.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Separator from '$lib/ui/display/separator.svelte';
	import { createDefaultBaseSize } from '$lib/project/create-default-base-size';

	let breakpoint = $state<CreateBreakpointData>({
		label: '',
		width: 500
	});

	let errors = $state<CreateBreakpointErrors>({});

	type BreakpointCreatorProps = {
		onCreate: (newBreakpoint: OnCreateBreakpointData) => void;
		onCancel: () => void;
	};

	let { onCreate, onCancel }: BreakpointCreatorProps = $props();

	const onClickCreate = () => {
		const [_data, _errors] = createBreakpointValidator(breakpoint);

		errors = _errors;

		if (!_data) {
			return;
		}

		onCreate({
			..._data,
			defaultScale: {
				baseSize: createDefaultBaseSize({ unit: settings.unit }) * 1.2,
				ratio: 1.2
			},
			minStep: -1,
			maxStep: 6,
			overrides: {}
		});

		breakpoint = {
			label: '',
			width: 500
		};

		return;
	};
</script>

<div class="w-full border border-black bg-white">
	<div class="block p-4">
		<ul class="grid grid-cols-[repeat(3,1fr)] gap-4">
			<li class="col-span-2 w-full">
				<Separator as="label" for="breakpoint-creator-label"
					>Breakpoint Label</Separator
				>
				<Input
					id="breakpoint-creator-label"
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					variant={errors.label ? 'error' : 'default'}
					bind:value={breakpoint.label}
				/>

				{#if errors.label}
					<p class="text-red-800">
						{errors.label}
					</p>
				{/if}
			</li>
			<li>
				<Separator as="label" for="breakpoint-creator-width"
					>Width Threshold</Separator
				>
				<InputUnit
					id="breakpoint-creator-width"
					unit="px"
					class="text-4xl font-bold"
					unitClass="text-2xl"
					min={0}
					step={1}
					placeholder="400"
					variant={errors.width ? 'error' : 'default'}
					bind:value={breakpoint.width}
				/>

				{#if errors.width}
					<p class="text-red-800">
						{errors.width}
					</p>
				{/if}
			</li>
			<li></li>
			<li class="w-full">
				<Button
					class="w-full py-2"
					label="Create"
					onclick={onClickCreate}
				/>
			</li>
			<li class="w-full">
				<Button
					class="w-full py-2"
					variant="destructive"
					label="Cancel"
					onclick={() => onCancel()}
				/>
			</li>
		</ul>
	</div>
</div>
