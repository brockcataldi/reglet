<script lang="ts" module>
	import type { Role } from '#lib/domain/preview/guess-roles.js';

	// kept for the session, so switching previews doesn't undo picks
	const picked = $state<Partial<Record<Role, string>>>({});
	const chosen = $state<{ breakpointId?: string; fluidWidth?: number }>(
		{}
	);
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import type { Breakpoint, Tag } from '#lib/types.js';

	import { guessRoles, ROLES } from '#lib/domain/preview/guess-roles.js';
	import { settingAt } from '#lib/domain/preview/setting-at.js';
	import { toSettingStyle } from '#lib/domain/preview/to-setting-style.js';
	import project from '#lib/stores/project.svelte.js';
	import { cn } from '#lib/utilities.js';

	import InlineField, {
		inlineControlClass
	} from '#lib/ui/form/inline-field.svelte';

	import Annotated from './_components/Annotated.svelte';

	let { children } = $props();

	// the margin of tag notes beside the page, and the gap between them
	const MARGIN = 232;

	const context = $derived({
		type: project.type,
		breakpoints: project.breakpoints.breakpoints,
		lanes: (id: string) => project.lanes.get(id),
		precision: project.precision
	});

	const fluid = $derived(
		project.type === 'fluid' &&
			project.breakpoints.breakpoints.length === 2
	);

	// static projects only place tags on the root
	const breakpoints = $derived(
		project.type === 'static'
			? project.breakpoints.breakpoints.slice(0, 1)
			: project.breakpoints.breakpoints
	);

	// a root of 0px still needs a page to draw; fluid min and max are real
	// widths the sizes slide between, so they're drawn as they are
	const pageWidth = (bp: Breakpoint) =>
		project.type === 'static'
			? 720
			: project.type === 'fluid'
				? bp.width
				: Math.max(bp.width, 375);

	const rootSize = (tag: Tag) => settingAt(tag, 0, context)?.fontSize ?? 0;
	const guessed = $derived(guessRoles(project.tags.tags, rootSize));

	// a picked tag that's since been deleted falls back to the guess
	const roleTag = (role: Role) => {
		const id = picked[role];
		return id && project.tags.get(id) ? id : guessed[role];
	};

	// the role whose select has focus or the pointer; its text is highlighted
	// on the page, the pointer winning while it's over a different select
	let focused = $state<Role>();
	let hovered = $state<Role>();

	const current = $derived(
		breakpoints.find((bp) => bp.id === chosen.breakpointId) ??
			breakpoints.at(-1)
	);

	// fluid projects can also stop anywhere between min and max
	const width = $derived(
		fluid && chosen.fluidWidth !== undefined
			? chosen.fluidWidth
			: current
				? pageWidth(current)
				: 375
	);

	// the notes' margin plus a page `width` wide
	const pageOuter = $derived(width + MARGIN);

	// pages wider than the room left are zoomed down, never up
	let room = $state(0);
	const zoom = $derived(room ? Math.min(1, room / pageOuter) : 1);

	const settingFor = (role: Role) => {
		const tag = project.tags.get(roleTag(role) ?? '');
		return tag ? settingAt(tag, width, context) : undefined;
	};

	const styleOf = (role: Role) =>
		toSettingStyle(
			settingFor(role),
			project.fontSizeUnit,
			project.letterSpacingUnit
		);

	const selectWidth = (bp: Breakpoint) => {
		chosen.breakpointId = bp.id;
		chosen.fluidWidth = undefined;
	};

	// like the navigation: the current width is plain text, the rest are
	// buttons with cobalt hover and focus
	const widthItem =
		'flex h-9 items-center border-r border-black px-4 font-mono text-sm font-bold whitespace-nowrap last:border-r-0';
</script>

{#if project.tags.tags.length === 0}
	<div class="mx-auto max-w-200 py-8">
		<h1 class="text-6xl font-bold tracking-tighter">No tags yet</h1>
		<p class="mt-4 text-sm text-neutral-600">
			Add tags in
			<a
				class="font-mono underline hover:text-cobalt-500 focus-visible:text-cobalt-500"
				href={resolve('/(app)/settings')}>Settings</a
			> and place them in the Tag View to preview a page.
		</p>
	</div>
{:else}
	<div class="p-6">
		<!-- widths stay put above the page: the page below resizes and zooms with
		the width, so controls inside it would slide out from under the pointer -->
		<div
			class="mb-6 flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3"
		>
			<ul
				class="flex w-fit flex-row border border-black bg-white"
				aria-label="Page width"
			>
				{#each breakpoints as bp (bp.id)}
					{@const label = `${bp.name} (${pageWidth(bp)}px)`}
					<li class="contents">
						{#if chosen.fluidWidth === undefined && current?.id === bp.id}
							<span class={cn(widthItem, 'bg-black text-white')}>
								{label}<span class="sr-only"> (current)</span>
							</span>
						{:else}
							<button
								type="button"
								class={cn(
									widthItem,
									'bg-white text-black hover:bg-cobalt-500 hover:text-white focus-visible:bg-cobalt-500 focus-visible:text-white focus-visible:outline-none'
								)}
								onclick={() => selectWidth(bp)}
							>
								{label}
							</button>
						{/if}
					</li>
				{/each}
			</ul>
			{#if fluid}
				<InlineField
					for="preview-fluid-width"
					label="Width"
					suffix={`${width}px`}
					class="w-100"
					labelClass="w-16"
				>
					<input
						id="preview-fluid-width"
						type="range"
						class="min-w-0 flex-1 accent-cobalt-500"
						min={breakpoints[0].width}
						max={breakpoints[1].width}
						value={width}
						oninput={(event) =>
							(chosen.fluidWidth = Number(event.currentTarget.value))}
					/>
				</InlineField>
			{/if}
		</div>
		<div bind:clientWidth={room}>
			<div
				class="mx-auto"
				style:width={`${pageOuter}px`}
				style:zoom
				style:--page-pad={`${Math.round(width * 0.05)}px`}
			>
				<div class="relative py-12">
					<!-- the page alone is framed; the notes sit outside it -->
					<div
						class="absolute inset-y-0 right-0 border border-black bg-white"
						style:width={`${width}px`}
					></div>
					<div class="relative">
						<!-- a fresh frame per preview, so notes start from its parts -->
						{#key page.route.id}
							<Annotated {styleOf} active={hovered ?? focused}>
								{@render children()}
								{#snippet note(role)}
									{@const setting = settingFor(role)}
									{@const label = ROLES.find((r) => r.id === role)?.label}
									{@const size = setting
										? `${setting.fontSize}${project.fontSizeUnit} / ${setting.lineHeight}${setting.fluid ? ', fluid' : ''}`
										: 'Not placed at this width'}
									<InlineField
										for={`preview-${role}`}
										label={label ?? role}
										labelClass="w-auto text-xs"
									>
										<select
											id={`preview-${role}`}
											class={inlineControlClass}
											value={roleTag(role) ?? ''}
											onchange={(event) =>
												(picked[role] = event.currentTarget.value)}
											onfocus={() => (focused = role)}
											onblur={() => (focused = undefined)}
											onmouseenter={() => (hovered = role)}
											onmouseleave={() => (hovered = undefined)}
										>
											{#each project.tags.tags as tag (tag.id)}
												<option value={tag.id}>{tag.name}</option>
											{/each}
										</select>
									</InlineField>
									<p class="mt-1 text-xs text-neutral-600">{size}</p>
								{/snippet}
							</Annotated>
						{/key}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
