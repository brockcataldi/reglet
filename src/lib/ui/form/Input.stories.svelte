<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'UI/Forms/Input',
		component: Input,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ placeholder: 'hello world!' }} />
