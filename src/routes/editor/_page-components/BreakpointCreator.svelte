<script lang="ts">
	import type { Breakpoint } from '$lib/types';

	import settings from '$lib/stores/settings.svelte';

	import { createDefaultScale } from '$lib/project/create-default-scale';

	import {
		createBreakpointValidator,
		type CreateBreakpointData,
		type CreateBreakpointErrors
	} from './create-breakpoint';

	import Button from '$lib/ui/button/button.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Separator from '$lib/ui/display/separator.svelte';

	let breakpoint = $state<CreateBreakpointData>({
		label: '',
		width: 500
	});

	let errors = $state<CreateBreakpointErrors>({});

	type BreakpointCreatorProps = {
		oncreate: (newBreakpoint: Omit<Breakpoint, 'id'>) => void;
		oncancel: () => void;
	};

	let { oncreate, oncancel }: BreakpointCreatorProps = $props();

	const onclickAdd = () => {
		const [_data, _errors] = createBreakpointValidator(breakpoint);

		errors = _errors;

		if (!_data) {
			return;
		}

		oncreate({
			..._data,
			defaultScale: createDefaultScale({
				unit: settings.unit,
				modifier: 1.15
			}),
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
		<div class="grid grid-cols-[3fr_1.5fr_1fr] gap-4">
			<div class="w-full">
				<Separator as="label" for="breakpoint-label-new"
					>Breakpoint Label</Separator
				>
				<Input
					id="breakpoint-label-new"
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
			</div>
			<div>
				<Separator as="label" for="breakpoint-label-width"
					>Width Threshold</Separator
				>
				<InputUnit
					id="breakpoint-label-width"
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
			</div>

			<div>
				<ul class="flex flex-col items-start justify-start gap-2">
					<li class="w-full">
						<Button class="w-full py-2" label="Add" onclick={onclickAdd} />
					</li>
					<li class="w-full">
						<Button
							class="w-full py-2"
							variant="destructive"
							label="Cancel"
							onclick={() => oncancel()}
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
