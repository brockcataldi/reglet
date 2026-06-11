<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LinkButton from './LinkButton.svelte';
	import { House } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'UI/Buttons/Link Button',
		component: LinkButton,
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

<Story name="Default with Icon">
	<House strokeWidth={1.5} />
	Hello World!
</Story>

<Story name="Destructive" args={{ variant: 'destructive' }}>Hello World!</Story>
