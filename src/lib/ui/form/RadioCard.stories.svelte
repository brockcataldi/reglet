<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RadioCard from './RadioCard.svelte';

	const { Story } = defineMeta({
		title: 'UI/Forms/Radio Card',
		component: RadioCard,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ class: 'max-w-[200px]' }}>
	<span class="block text-lg uppercase">Radio Card</span>
	<span class="block text-sm">
		Lorem ipsum dolor sit amet consectetur adipisicing elit.
	</span>
</Story>
