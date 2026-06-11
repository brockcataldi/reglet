<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Field from './Field.svelte';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'UI/Forms/Field',
		component: Field,
		tags: ['autodocs']
	});
</script>

<Story name="Empty" args={{ for: 'test-0', label: 'Demo Label' }} />

<Story name="Text Field" args={{ for: 'test-1', label: 'Demo Label' }}>
	<Input id="test-1" placeholder="text field" />
</Story>
