<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextArea from './TextArea.svelte';

	const { Story } = defineMeta({
		title: 'UI/Forms/Text Area',
		component: TextArea,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ placeholder: 'hello world!' }} />
