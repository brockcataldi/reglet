<script lang="ts">
	import z from 'zod';

	import type { Breakpoint } from '$lib/types';

	import Button from '$lib/ui/button/button.svelte';
	import InputUnit from '$lib/ui/form/input-unit.svelte';
	import Input from '$lib/ui/form/input.svelte';
	import Separator from '$lib/ui/display/separator.svelte';

	let addBreakpointSchema = z.object({
		label: z.string().trim().min(1, { error: 'Breakpoint Label cannot be empty' }),
		width: z
			.number({ error: 'Width Threshold cannot be empty' })
			.min(0, { error: 'Width Threshold cannot be negative' })
	});

	type AddBreakpointSchema = z.infer<typeof addBreakpointSchema>;

	let breakpoint = $state<Omit<Breakpoint, 'id' | 'lanes'>>({
		label: '',
		width: 500
	});
	let errors = $state<Partial<Record<keyof AddBreakpointSchema, string>>>(
		{}
	);

	type AddBreakpointProps = {
		onadd: (newBreakpoint: Omit<Breakpoint, 'id'>) => void;
		oncancel: () => void;
	};

	let { onadd, oncancel }: AddBreakpointProps = $props();

	const validate = (): Omit<Breakpoint, 'id' | 'lanes'> | undefined => {
		const validation = addBreakpointSchema.safeParse(breakpoint);

		if (validation.success) {
			return validation.data;
		}

		const fieldErrors = z.flattenError(validation.error).fieldErrors;

		errors = {
			label: fieldErrors.label?.[0],
			width: fieldErrors.width?.[0]
		};

		return undefined;
	};
	const onclickAdd = () => {
		const data = validate();

		if (!data) {
			return;
		}

		onadd({
			...data,
			lanes: []
		});

		breakpoint = {
			label: '',
			width: 500
		};

		return;
	};

</script>
<div class='w-full border border-black bg-white'>
	<div class="block p-4">
		<div class="grid grid-cols-[3fr_1.5fr_1fr] gap-4">
			<div class="w-full">
				<Separator as="label" for="breakpoint-label-new">Breakpoint Label</Separator>
				<Input
					id="breakpoint-label-new"
					placeholder="ex. Mobile"
					class="w-full text-4xl font-bold"
					bind:value={breakpoint.label}
				/>

				{#if errors.label}
					<p>
						{errors.label}
					</p>
				{/if}
			</div>
			<div>
				<Separator as="label" for="breakpoint-label-width">Width Threshold</Separator>
				<InputUnit
					id="breakpoint-label-width"
					unit="px"
					type="number"
					class="text-4xl font-bold"
					unitClass="text-2xl"
					min={0}
					step={1}
					bind:value={breakpoint.width}
				/>

				{#if errors.width}
					<p>
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
