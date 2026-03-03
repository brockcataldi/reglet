<script lang="ts">
	import { cn } from '$lib/functions/utilities';

	type Props = {
		label: string;
		position: number;
		align: 'left' | 'right';
		color: string;
		onchange: (newPosition: number) => void;
	};

	let { label, position, align = 'right', color, onchange }: Props = $props();

	let pressed = $state(false);
	let y = $state(0);

	function handleMouseDown(event: MouseEvent) {
		event.preventDefault();
		pressed = true;
		y = event.clientY;

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		event.preventDefault();
		if (pressed) {
			const delta = event.clientY - y;
			y = event.clientY;
			onchange(position + delta);
		}
	}

	function handleMouseUp(event: MouseEvent) {
		event.preventDefault();
		pressed = false;

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			event.preventDefault();
			onchange(position + (event.key === 'ArrowUp' ? 1 : -1));
		}
	}

	const lineClasses = $derived(
		cn(
			'absolute top-0 w-full h-[28px] pointer-events-none',
			"after:content-[''] after:absolute after:w-full",
			'after:h-[1px] after:bg-red-500',
			'after:top-[13.5px] after:z-0'
		)
	);

	const labelClasses = $derived(
		cn(
			'absolute z-10 block w-fit',
			'px-2 py-1',
			'm-0',
			'text-[14px]',
			'rounded-[20px]',
			'border border-red-500',
			'bg-white',
			'pointer-events-auto',
			'cursor-ns-resize',
			'select-none',
			align === 'right' && 'right-0',
			align === 'left' && 'left-0'
		)
	);
</script>

<div
	class={lineClasses}
	style={`transform: translateY(${position}px);`}
	style:--color={color}
>
	<div
		class={labelClasses}
		role="slider"
		aria-valuenow={position}
		tabindex="0"
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
	>
		{label}
	</div>
</div>
