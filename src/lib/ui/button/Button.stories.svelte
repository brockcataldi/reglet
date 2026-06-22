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

<Story name="Default" args={{ label: 'Hello World!' }}></Story>

<Story
	name="Default with prepended Icon"
	args={{ label: 'Hello World!', icon: House }}
></Story>

<Story
	name="Default with appended Icon"
	args={{ label: 'Hello World!', icon: House, iconPosition: 'append' }}
></Story>

<Story name="Primary" args={{ variant: 'primary', label: 'Hello World!' }}
></Story>

<Story
	name="Destructive"
	args={{ variant: 'destructive', label: 'Hello World!' }}
></Story>
