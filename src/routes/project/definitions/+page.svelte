<script lang="ts">
	import styles from '$lib/stores/profiles.svelte';
	import { createDefaultProfile } from '$lib/types';

	import Button from '$lib/components/button.svelte';
	import Plus from '$lib/icons/plus.svelte';

	import ProfileStyle from './_components/profile-style.svelte';

	const onclickAdd = () => {
		styles.createGuest(createDefaultProfile());
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
		<ProfileStyle id={styles.host.id} deletable={false} />
	</div>
	<div>
		<header class="flex items-center justify-between py-4">
			<h2 class="text-3xl font-bold">Guest Styles</h2>
			<Button icon={Plus} onclick={onclickAdd}>Add Style</Button>
		</header>
		<ul class="flex flex-col items-start justify-start gap-2">
			{#each styles.guests as guest (guest.id)}
				<li class="w-full">
					<ProfileStyle id={guest.id} deletable={true} />
				</li>
			{/each}
		</ul>
	</div>
</main>
