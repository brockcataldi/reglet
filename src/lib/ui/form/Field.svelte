<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type FieldProps = {
		for: string;
		label: string;
	} & HTMLAttributes<HTMLDivElement>;

	let { for: htmlFor, label, children }: FieldProps = $props();
</script>

<div class="[&:focus-within>label]:text-violet-700">
	<label class="pl-1 text-xs text-neutral-500 uppercase" for={htmlFor}>{label}</label>
	<div>
		{@render children?.()}
	</div>
</div>
