<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	// import { fn } from 'storybook/test';
	import Button from './Button.svelte';
	import { House } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'UI/Buttons/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'destructive']
			}
		}
	});
</script>

<Story name="Default">Hello World!</Story>

<Story name="Default with prepended Icon">
	<House strokeWidth={1.5} />
	Hello World!
</Story>

<Story name="Default with appended Icon">
	Hello World!
	<House strokeWidth={1.5} />
</Story>

<Story name="Primary" args={{ variant: 'primary' }}>Hello World!</Story>

<Story name="Destructive" args={{ variant: 'destructive' }}>Hello World!</Story>
