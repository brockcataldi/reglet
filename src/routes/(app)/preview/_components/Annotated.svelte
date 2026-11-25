<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	import type { Role } from '#lib/domain/preview/guess-roles.js';
	import { cn } from '#lib/utilities.js';

	import { setPreview } from './context';

	type AnnotatedProps = {
		// inline style for a role's tag at the page's width
		styleOf: (role: Role) => string;
		// the margin note beside a role's first part
		note: Snippet<[Role]>;
		// the role being picked, whose text is highlighted
		active?: Role;
		// the page, built from Parts
		children: Snippet;
	};

	let { styleOf, note, active, children }: AnnotatedProps = $props();

	// the space kept between two notes that would otherwise touch
	const NOTE_GAP = 12;

	const anchors = new Map<Role, HTMLElement>();
	const notes = new Map<Role, HTMLElement>();

	// the roles this page uses, in page order, and where their notes sit
	let present = $state<Role[]>([]);
	let tops = $state<Partial<Record<Role, number>>>({});

	// each note sits level with its part, unless the note above reaches
	// further down, ex. beside a one-line headline; then it waits below it
	const layout = () => {
		const next: Partial<Record<Role, number>> = {};
		let floor = 0;

		const placed = [...anchors].sort(
			([, a], [, b]) => a.offsetTop - b.offsetTop
		);

		for (const [role, anchor] of placed) {
			const top = Math.max(anchor.offsetTop, floor);
			next[role] = top;
			floor = top + (notes.get(role)?.offsetHeight ?? 0) + NOTE_GAP;
		}

		const roles = placed.map(([role]) => role);

		if (roles.join() !== present.join()) {
			present = roles;
		}

		tops = next;
	};

	// any size change on the page or in a note can move the notes
	const observer =
		typeof ResizeObserver === 'undefined'
			? undefined
			: new ResizeObserver(() => layout());

	const track =
		(map: Map<Role, HTMLElement>, role: Role): Attachment<HTMLElement> =>
		(element) => {
			map.set(role, element);
			observer?.observe(element);

			return () => {
				map.delete(role);
				observer?.unobserve(element);
				// a part that leaves, ex. on switching pages, takes its note
				queueMicrotask(layout);
			};
		};

	const watch: Attachment<HTMLElement> = (element) => {
		observer?.observe(element);
		void document.fonts?.ready.then(layout);

		return () => observer?.disconnect();
	};

	// the colours override the part's own so the text stays readable, and
	// the outline pads the highlight without moving anything
	const mark = (role: Role, classes = '') =>
		cn(
			classes,
			active === role &&
				'bg-cobalt-500 text-white outline-4 outline-cobalt-500 outline-solid'
		);

	setPreview({
		style: (role) => styleOf(role),
		mark,
		text: (role, classes) => ({
			style: styleOf(role),
			class: mark(role, classes)
		}),
		anchor: (role) => track(anchors, role)
	});
</script>

<div class="grid grid-cols-[13rem_1fr] gap-6">
	<!-- notes are laid out apart from the page, so they never change its spacing -->
	<div class="relative">
		{#each present as role (role)}
			<div
				class="absolute inset-x-0"
				class:invisible={tops[role] === undefined}
				style:top={`${tops[role] ?? 0}px`}
				{@attach track(notes, role)}
			>
				{@render note(role)}
			</div>
		{/each}
	</div>

	<!-- the preview sets its own type, so app fonts and colours stay out;
	inset by the page's side margins, set by the page as --page-pad. Pages
	respond to the page's width with container queries, not the window's -->
	<div
		class="@container relative min-w-0 px-(--page-pad) text-neutral-900"
		{@attach watch}
	>
		{@render children()}
	</div>
</div>
