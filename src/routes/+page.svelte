<script lang="ts">
	import { resolve } from '$app/paths';

	import LinkButton from '$lib/components/link-button.svelte';
</script>

<header>
	<div>
		<h1>reglet</h1>
		<p>reg&middot;let</p>

		<ol>
			<li>a flat narrow architectural molding</li>
			<li>a strip of wood used like a lead between lines of type</li>
			<li><strong>a typography sizing and spacing system</strong></li>
		</ol>

		<menu>
			<LinkButton href={resolve('/install')}>Get Started</LinkButton>
		</menu>
	</div>
</header>

<style>
	header {
		width: 100%;
		display: grid;
		place-items: center;
		box-sizing: border-box;
		padding: 4rem 1rem;
		height: 100dvh;
	}

	div {
		max-width: 750px;
		width: 100%;
	}

	h1 {
		font-family: var(--ff-ss);
		font-size: 3rem;
		margin: 0;
	}

	p {
		font-family: var(--ff-ss);
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
	}

	ol {
		margin: 0 0 1rem 0;
	}

	li {
		font-family: var(--ff-ss);
		font-size: 1rem;
	}

	menu {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		padding: 0;
		margin: 0;
	}
</style>
