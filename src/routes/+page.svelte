<script lang="ts">
	import { resolve } from '$app/paths';
	import LinkButton from '$lib/ui/button/LinkButton.svelte';
</script>

<main class="grid min-h-dvh place-items-center">
	<div>
		<heading class="flex flex-col items-start justify-start gap-1">
			<h1 class="text-9xl font-bold tracking-tighter">Reglet</h1>

			<div class="flex items-center justify-start gap-4">
				<p class="text-2xl">reg&middot;let</p>
				<p class="text-2xl">
					<strong>noun</strong>
				</p>
			</div>
		</heading>

		<ol class="my-6 list-decimal">
			<li>a flat narrow architectural molding</li>
			<li>a strip of wood used like a lead between lines of type</li>
			<li><strong>an app to build type systems</strong></li>
		</ol>

		<div>
			<LinkButton href={resolve('/new')}>Get Started</LinkButton>
		</div>
	</div>
</main>
