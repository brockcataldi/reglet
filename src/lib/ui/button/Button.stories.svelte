<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	// import { fn } from 'storybook/test';
	// import type { ComponentProps } from 'svelte';

	import Button from './Button.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'UI/Button',
		component: Button,
		tags: ['autodocs']
		// argTypes: {
		// 	backgroundColor: { control: 'color' },
		// 	size: {
		// 		control: { type: 'select' },
		// 		options: ['small', 'medium', 'large']
		// 	}
		// },
		// args: {
		// 	onclick: fn()
		// }
	});
</script>

<Story name="Default">Hello World!</Story>
