<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	const { Story } = defineMeta({
		title: 'UI/Forms/Select',
		component: Select,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<option>Option 1</option>
	<option>Option 2</option>
	<option>Option 3</option>
	<option>Option 4</option>
</Story>
