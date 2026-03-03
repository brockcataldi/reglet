<script lang="ts">
	import styles from '$lib/stores/profiles.svelte';

	import Button from '$lib/components/button.svelte';
	import Plus from '$lib/icons/plus.svelte';

	import TextStyle from './_components/text-style.svelte';

	const onclickAdd = () => {
		styles.createGuest({
			id: crypto.randomUUID(),
			ref: '',
			grammar: 'lowercase-dominant',
			styles: {
				family: '',
				weight: '400',
				style: 'normal',
				stretch: 'normal',
				opticalSizing: 'auto',
				variationSettings: []
			},
			measurements: {
				ascender: 0,
				capHeight: 50,
				xHeight: 100,
				baseline: 150,
				descender: 200
			}
		});
	};
</script>

<main class="mx-auto my-0 max-w-2xl">
	<header class="mb-4 pt-8">
		<h1 class="mb-2 text-5xl font-bold">Definitions</h1>
		<p>
			Define a "host" text style, which the font you plan to use the most
			otherwise known as the body font. Followed by "guest" text styles, for
			your headings, accents, etc.
		</p>
	</header>

	<div class="py-4">
		<h2 class="mb-2 text-3xl font-bold">Host Style</h2>
		<TextStyle id={styles.host.id} deletable={false} />
	</div>
	<div>
		<header class="flex items-center justify-between py-4">
			<h2 class="text-3xl font-bold">Guest Styles</h2>
			<Button icon={Plus} onclick={onclickAdd}>Add Style</Button>
		</header>
		<ul class="flex flex-col items-start justify-start gap-2">
			{#each styles.guests as guest (guest.id)}
				<li class="w-full">
					<TextStyle id={guest.id} deletable={true} />
				</li>
			{/each}
		</ul>
	</div>
</main>
