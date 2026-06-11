<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import IconButton from './IconButton.svelte';
	import { House } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'UI/Buttons/Icon Button',
		component: IconButton,
		tags: ['autodocs'],
		argTypes: {
			label: {
				control: { type: 'text' }
			},
			variant: {
				control: { type: 'select' },
				options: ['default', 'destructive']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Hello World' }}>
	<House strokeWidth={1.5} />
</Story>

<Story name="Destructive" args={{ variant: 'destructive', label: 'Hello World' }}>
	<House strokeWidth={1.5} />
</Story>
