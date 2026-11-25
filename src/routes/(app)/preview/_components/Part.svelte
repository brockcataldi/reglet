<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { Role } from '#lib/domain/preview/guess-roles.js';

	import { getPreview } from './context';

	type PartProps = {
		role: Role;
		// a role's note lines up with its first part only, so each role
		// has one control however many times it shows
		first?: boolean;
		class?: string;
		children: Snippet;
	};

	let {
		role,
		first = true,
		class: className,
		children
	}: PartProps = $props();

	const preview = getPreview();
</script>

<div class={className} {@attach first && preview.anchor(role)}>
	{@render children()}
</div>
