<script lang="ts" module>
	export type TagOption = {
		id: string;
		// what's shown and matched, ex. "tablet/h1"
		label: string;
		// where the tag sits right now, ex. "Step 6 · Arial 400"
		detail: string;
		// when set, choosing the option fills the input with this instead of
		// selecting it, ex. "tablet/" to narrow the list to one breakpoint
		complete?: string;
	};
</script>

<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import { normalizeTagName } from '#lib/domain/tags/normalize-tag-name.js';

	type Item =
		{ type: 'tag'; option: TagOption } | { type: 'create'; label: string };

	type TagPickerProps = {
		id: string;
		label: string;
		options: TagOption[];
		// defaults to the label containing the query
		match?: (option: TagOption, query: string) => boolean;
		// what creating from the query would make, or undefined if it can't
		createLabel: (query: string) => string | undefined;
		onSelect: (id: string) => void;
		onCreate: (query: string) => void;
	};

	let {
		id,
		label,
		options,
		match = (option, query) =>
			normalizeTagName(option.label).includes(normalizeTagName(query)),
		createLabel,
		onSelect,
		onCreate
	}: TagPickerProps = $props();

	let input = $state<HTMLInputElement>();
	let listbox = $state<HTMLUListElement>();
	let query = $state('');
	let open = $state(false);
	let activeIndex = $state(-1);

	const listboxId = $derived(`${id}-listbox`);
	const anchorName = $derived(`--${id}-anchor`);

	const items = $derived.by((): Item[] => {
		const normalized = normalizeTagName(query);

		const matches: Item[] = options
			.filter((option) => match(option, query))
			.map((option) => ({ type: 'tag', option }));

		const create = normalized === '' ? undefined : createLabel(query);

		if (create !== undefined) {
			matches.push({ type: 'create', label: create });
		}

		return matches;
	});

	const expanded = $derived(open && items.length > 0);

	$effect(() => {
		if (!listbox) {
			return;
		}

		const isOpen = listbox.matches(':popover-open');

		if (expanded && !isOpen) {
			listbox.showPopover();
		} else if (!expanded && isOpen) {
			listbox.hidePopover();
		}
	});

	$effect(() => {
		if (activeIndex < 0 || !listbox) {
			return;
		}

		listbox.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
	});

	export function focus() {
		input?.focus();
	}

	const close = () => {
		open = false;
		activeIndex = -1;
	};

	// keeps focus in the input so several tags can be added in a row
	const choose = (item: Item) => {
		if (item.type === 'tag' && item.option.complete !== undefined) {
			query = item.option.complete;
			open = true;
			activeIndex = -1;
			return;
		}

		if (item.type === 'tag') {
			onSelect(item.option.id);
		} else {
			onCreate(query);
		}

		query = '';
		close();
	};

	const onkeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				open = true;
				activeIndex = Math.min(activeIndex + 1, items.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = Math.max(activeIndex - 1, -1);
				break;
			case 'Enter': {
				if (normalizeTagName(query) === '' && activeIndex < 0) {
					break;
				}

				event.preventDefault();

				const exact = items.find(
					(item) =>
						item.type === 'tag' &&
						normalizeTagName(item.option.label) === normalizeTagName(query)
				);
				// with nothing highlighted, an exact match wins, then the first
				const item =
					activeIndex >= 0 ? items[activeIndex] : (exact ?? items[0]);

				if (item) {
					choose(item);
				}
				break;
			}
			case 'Escape':
				if (expanded) {
					event.preventDefault();
					close();
				} else if (query !== '') {
					event.preventDefault();
					query = '';
				}
				break;
		}
	};
</script>

<label for={id} class="sr-only">{label}</label>
<input
	bind:this={input}
	bind:value={query}
	{id}
	type="text"
	placeholder="Add tag…"
	class="w-40 border-0 border-b border-black bg-transparent px-1 py-0.5 font-mono text-sm hover:border-b-2 hover:border-b-cobalt-500 focus-visible:border-b-2 focus-visible:border-b-cobalt-500 focus-visible:outline-none"
	style={`anchor-name: ${anchorName}`}
	role="combobox"
	autocomplete="off"
	aria-autocomplete="list"
	aria-expanded={expanded}
	aria-controls={listboxId}
	aria-activedescendant={expanded && activeIndex >= 0
		? `${listboxId}-${activeIndex}`
		: undefined}
	oninput={(event) => {
		// a hidden input has nothing to anchor the popover to
		open = event.currentTarget.checkVisibility();
		activeIndex = -1;
	}}
	onclick={() => (open = true)}
	onblur={close}
	{onkeydown}
/>

<ul
	bind:this={listbox}
	id={listboxId}
	role="listbox"
	aria-label={label}
	popover="manual"
	class="m-0 max-h-72 overflow-y-auto border border-black bg-white p-0"
	style={`position-anchor: ${anchorName}; inset: auto; top: anchor(bottom); left: anchor(left); min-width: max(anchor-size(width), 16rem);`}
>
	{#each items as item, index (item.type === 'tag' ? item.option.id : 'create')}
		{@const active = index === activeIndex}
		<!-- keyboard selection is handled by the input (combobox pattern) -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<li
			id={`${listboxId}-${index}`}
			role="option"
			aria-selected={active}
			class={cn(
				'group flex cursor-pointer items-baseline justify-between gap-4 px-2 py-1 font-mono text-sm whitespace-nowrap',
				active && 'bg-cobalt-500 text-white'
			)}
			onmousedown={(event) => event.preventDefault()}
			onclick={() => choose(item)}
			onmousemove={() => (activeIndex = index)}
		>
			{#if item.type === 'tag'}
				<span class="font-bold">{item.option.label}</span>
				<span
					class={cn('text-xs', active ? 'text-white' : 'text-neutral-600')}
					>{item.option.detail}</span
				>
			{:else}
				<span>Create “<strong>{item.label}</strong>”</span>
			{/if}
		</li>
	{/each}
</ul>
