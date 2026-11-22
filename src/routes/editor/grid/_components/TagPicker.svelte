<script lang="ts" module>
	export type TagOption = {
		id: string;
		name: string;
		// where the tag sits right now, ex. "Step 6 · Arial 400"
		detail: string;
	};
</script>

<script lang="ts">
	import { cn } from '#lib/utilities.js';
	import { normalizeTagName } from '#lib/domain/tags/normalize-tag-name.js';

	type Item =
		{ type: 'tag'; option: TagOption } | { type: 'create'; name: string };

	type TagPickerProps = {
		id: string;
		label: string;
		options: TagOption[];
		canCreate: (name: string) => boolean;
		onSelect: (id: string) => void;
		onCreate: (name: string) => void;
	};

	let {
		id,
		label,
		options,
		canCreate,
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
			.filter((option) =>
				normalizeTagName(option.name).includes(normalized)
			)
			.map((option) => ({ type: 'tag', option }));

		if (normalized !== '' && canCreate(query)) {
			matches.push({ type: 'create', name: query.trim() });
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
		if (item.type === 'tag') {
			onSelect(item.option.id);
		} else {
			onCreate(item.name);
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
						normalizeTagName(item.option.name) === normalizeTagName(query)
				);
				// with nothing highlighted, an exact name wins over creating
				const item =
					activeIndex >= 0
						? items[activeIndex]
						: (exact ?? (items.length === 1 ? items[0] : undefined));

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
	class="w-36 border-0 border-b border-black bg-transparent px-1 py-0.5 font-mono text-sm hover:border-b-cobalt-500 focus-visible:border-b-cobalt-500"
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
		<!-- keyboard selection is handled by the input (combobox pattern) -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<li
			id={`${listboxId}-${index}`}
			role="option"
			aria-selected={index === activeIndex}
			class={cn(
				'flex cursor-pointer items-baseline justify-between gap-4 px-2 py-1 font-mono text-sm whitespace-nowrap',
				index === activeIndex && 'bg-cobalt-50'
			)}
			onmousedown={(event) => event.preventDefault()}
			onclick={() => choose(item)}
			onmousemove={() => (activeIndex = index)}
		>
			{#if item.type === 'tag'}
				<span class="font-bold">{item.option.name}</span>
				<span class="text-xs text-neutral-600">{item.option.detail}</span>
			{:else}
				<span>Create “<strong>{item.name}</strong>”</span>
			{/if}
		</li>
	{/each}
</ul>
