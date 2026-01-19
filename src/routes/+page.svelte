<script lang="ts">
	import { resolve } from '$app/paths';
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
		<a href={resolve('/install')}>Get Started</a>
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
		font-family: var(--font-family);
		font-size: 3rem;
		margin: 0;
	}

	li {
		font-family: var(--font-family);
		font-size: 1rem;
	}

	p {
		font-family: var(--font-family);
		font-size: 1.5rem;
		margin: 0;
	}

	a {
		font-family: var(--font-family);
		font-size: 1rem;
		margin: 0;
		font-weight: 700;
	}
</style>
