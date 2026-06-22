<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	// import { fn } from 'storybook/test';
	import IconLinkButton from './IconLinkButton.svelte';
	import { House } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'UI/Buttons/Icon Link Button',
		component: IconLinkButton,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: { type: 'text' }
			},
			variant: {
				control: { type: 'select' },
				options: ['primary', 'destructive']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Hello World', icon: House }}></Story>

<Story
	name="Destructive"
	args={{ variant: 'destructive', label: 'Hello World', icon: House }}
></Story>
