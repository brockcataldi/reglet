<script lang="ts" module>
	import type { ExportFormat } from '#lib/domain/export/formats.js';

	// kept for the session, so leaving the page doesn't undo the pick
	const chosen = $state<{ format: ExportFormat }>({ format: 'classes' });
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { Check, Copy, Download } from '@lucide/svelte';

	import { FALLBACKS, isFallback } from '#lib/domain/export/fallback.js';
	import { FORMATS, toExport } from '#lib/domain/export/formats.js';
	import { toTagRules } from '#lib/domain/export/rules.js';
	import project from '#lib/stores/project.svelte.js';

	import Button from '#lib/ui/button/button.svelte';
	import Separator from '#lib/ui/display/separator.svelte';
	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';
	import Checkbox from '#lib/ui/form/checkbox.svelte';
	import Input from '#lib/ui/form/input.svelte';
	import RadioCard from '#lib/ui/form/radio-card.svelte';

	const context = $derived({
		type: project.type,
		breakpoints: project.breakpoints.breakpoints,
		lanes: (id: string) => project.lanes.get(id),
		precision: project.precision,
		fontSizeUnit: project.fontSizeUnit,
		letterSpacingUnit: project.letterSpacingUnit,
		stylesheets: project.fonts.stylesheets,
		fallback: (family: string) => project.fallbackFor(family),
		prefix: project.prefix,
		shorthand: project.shorthand
	});

	// each font the lanes use, once; linked lanes share their source's
	const families = $derived([
		...new Set(
			project.lanes.lanes.map((lane) => lane.family.trim()).filter(Boolean)
		)
	]);

	const format = $derived(
		FORMATS.find((f) => f.value === chosen.format) ?? FORMATS[0]
	);

	const output = $derived(
		toExport(project.tags.tags, context, chosen.format)
	);

	const unplaced = $derived(
		toTagRules(project.tags.tags, context)
			.filter((rules) => rules.blocks.length === 0)
			.map((rules) => rules.tag)
	);

	// straight to the tag's row in the Tag View
	const tagHref = (id: string) =>
		`${resolve('/(app)/editor/tag')}#tag-${id}`;

	let copied = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	const copy = async () => {
		await navigator.clipboard.writeText(output);
		copied = true;
		clearTimeout(copiedTimer);
		copiedTimer = setTimeout(() => (copied = false), 2000);
	};

	const download = () => {
		const url = URL.createObjectURL(
			new Blob([output], { type: format.mime })
		);
		const link = document.createElement('a');

		link.href = url;
		link.download = `typography.${format.extension}`;
		link.click();
		URL.revokeObjectURL(url);
	};
</script>

<svelte:head>
	<title>Export - Reglet</title>
</svelte:head>

<header class="bg-sunburst-500 py-4">
	<div class="mx-auto my-0 max-w-200">
		<h1 class="mb-4 text-8xl font-bold tracking-tighter text-black">
			Export
		</h1>
	</div>
</header>

<section class="w-full bg-white py-8">
	<div class="mx-auto my-0 max-w-200">
		{#if project.tags.tags.length === 0}
			<h2 class="text-6xl font-bold tracking-tighter">No tags yet</h2>
			<p class="mt-4 text-sm text-neutral-600">
				Add tags in
				<a
					class="font-mono underline hover:text-cobalt-500 focus-visible:text-cobalt-500"
					href={resolve('/(app)/settings')}>Settings</a
				> and place them in the Tag View to export them.
			</p>
		{:else}
			<div>
				<Separator as="p" id="export-format-label">Format</Separator>
				<div
					class="mt-2 grid grid-cols-3 gap-2"
					role="radiogroup"
					aria-labelledby="export-format-label"
				>
					{#each FORMATS as format (format.value)}
						<RadioCard
							name="export-format"
							value={format.value}
							bind:group={chosen.format}
						>
							<span class="flex flex-col gap-1">
								<span class="text-lg font-semibold">{format.name}</span>
								<span class="text-sm">{format.description}</span>
							</span>
						</RadioCard>
					{/each}
				</div>
			</div>

			{#if chosen.format !== 'json'}
				<div class="mt-8">
					<Separator as="label" for="export-prefix">Prefix</Separator>
					<p class="mb-2 text-sm text-neutral-600">
						Goes before every name, so type- turns .h1 into .type-h1.
					</p>
					<Input
						id="export-prefix"
						class="w-1/2"
						placeholder="None"
						autocomplete="off"
						spellcheck="false"
						bind:value={project.prefix}
					/>
				</div>

				<div class="mt-8">
					<Separator as="p">Shorthand</Separator>
					<p class="mb-2 text-sm text-neutral-600">
						One font property for the style, weight, font size, line height
						and family, such as font: 700 2rem/1.2 serif. Letter spacing
						stays separate.
					</p>
					<Checkbox
						id="export-shorthand"
						label="Use the font shorthand"
						bind:checked={project.shorthand}
					/>
				</div>
			{/if}

			<div class="mt-8">
				<Separator as="p">Fallbacks</Separator>
				<p class="mb-2 text-sm text-neutral-600">
					The generic family each font falls back to while it loads, or if
					it can't.
				</p>
				<div class="grid grid-cols-2 gap-x-6">
					{#each families as family, index (family)}
						<InlineField
							for={`export-fallback-${index}`}
							label={family}
							labelClass="w-auto max-w-1/2 truncate"
						>
							<select
								id={`export-fallback-${index}`}
								class={inlineControlClass}
								value={project.fallbackFor(family)}
								onchange={(event) => {
									const value = event.currentTarget.value;
									if (isFallback(value))
										project.setFallback(family, value);
								}}
							>
								{#each FALLBACKS as fallback (fallback)}
									<option value={fallback}>{fallback || 'None'}</option>
								{/each}
							</select>
						</InlineField>
					{/each}
				</div>
			</div>

			<div class="mt-8">
				<div class="mb-4 flex gap-2">
					<Button
						icon={copied ? Check : Copy}
						label={copied ? 'Copied' : 'Copy'}
						onclick={copy}
					/>
					<Button icon={Download} label="Download" onclick={download} />
				</div>
				<p class="sr-only" aria-live="polite">
					{copied ? 'Copied to the clipboard' : ''}
				</p>

				{#if unplaced.length > 0}
					<p class="mb-4 text-sm text-neutral-600">
						Not placed anywhere, so left out:
						{#each unplaced as tag, index (tag.id)}
							<!-- eslint-disable svelte/no-navigation-without-resolve -- the path is resolved in tagHref; resolve() takes no hash -->
							<a
								class="font-mono underline hover:text-cobalt-500 focus-visible:text-cobalt-500"
								href={tagHref(tag.id)}
								>{tag.name}<span class="sr-only">
									(place in the Tag View)</span
								></a
							>{index < unplaced.length - 1 ? ', ' : '.'}
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/each}
					</p>
				{/if}

				<!-- scrolls sideways, so keyboard users need to reach it -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<pre
					class="overflow-x-auto border border-black bg-white p-4 text-sm"
					role="region"
					aria-label={`Exported ${format.name}`}
					tabindex="0"><code>{output}</code></pre>
			</div>
		{/if}
	</div>
</section>
