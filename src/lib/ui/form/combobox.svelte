<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '#lib/utilities.js';
	import Input from './input.svelte';

	type ComboboxProps = {
		id: string;
		value: string;
		options: string[];
		onValueChange: (value: string) => void;
		option?: Snippet<[string]>;
		placeholder?: string;
		class?: string;
		variant?: 'default' | 'disabled' | 'error';
	};

	let {
		id,
		value,
		options,
		onValueChange,
		option,
		placeholder,
		class: className,
		variant
	}: ComboboxProps = $props();

	let open = $state(false);
	// only filter once the user types, so focusing shows every option
	let filtering = $state(false);
	let activeIndex = $state(-1);
	let listbox = $state<HTMLUListElement>();

	const listboxId = $derived(`${id}-listbox`);
	const anchorName = $derived(`--${id}-anchor`);

	const filtered = $derived.by(() => {
		if (!filtering) {
			return options;
		}

		const query = value.trim().toLowerCase();
		return options.filter((entry) => entry.toLowerCase().includes(query));
	});

	const expanded = $derived(open && filtered.length > 0);

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

	const close = () => {
		open = false;
		filtering = false;
		activeIndex = -1;
	};

	const select = (entry: string) => {
		onValueChange(entry);
		close();
	};

	const onkeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				open = true;
				activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = Math.max(activeIndex - 1, -1);
				break;
			case 'Enter':
				if (expanded && activeIndex >= 0) {
					event.preventDefault();
					select(filtered[activeIndex]);
				}
				break;
			case 'Escape':
				if (expanded) {
					// also stops an enclosing <dialog> from closing
					event.preventDefault();
					close();
				}
				break;
		}
	};
</script>

<Input
	{id}
	{value}
	{placeholder}
	{variant}
	class={className}
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
		filtering = true;
		// a hidden input (ex. inside a closed <dialog>) has nothing to anchor
		// the popover to, so it would render in the top-left corner
		open = event.currentTarget.checkVisibility();
		activeIndex = -1;
		onValueChange(event.currentTarget.value);
	}}
	onfocus={() => (open = true)}
	onblur={close}
	{onkeydown}
/>

<ul
	bind:this={listbox}
	id={listboxId}
	role="listbox"
	popover="manual"
	class="m-0 max-h-72 overflow-y-auto border border-black bg-white p-0"
	style={`position-anchor: ${anchorName}; inset: auto; top: anchor(bottom); left: anchor(left); min-width: anchor-size(width);`}
>
	{#each filtered as entry, index (entry)}
		<!-- keyboard selection is handled by the input (combobox pattern) -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<li
			id={`${listboxId}-${index}`}
			role="option"
			aria-selected={index === activeIndex}
			class={cn(
				'cursor-pointer px-2 py-1 text-xl whitespace-nowrap',
				index === activeIndex && 'bg-cobalt-50',
				entry === value && 'font-bold'
			)}
			onmousedown={(event) => event.preventDefault()}
			onclick={() => select(entry)}
			onmousemove={() => (activeIndex = index)}
		>
			{#if option}
				{@render option(entry)}
			{:else}
				{entry}
			{/if}
		</li>
	{/each}
</ul>
