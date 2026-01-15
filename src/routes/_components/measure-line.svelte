<script lang="ts">
	type MeasureLineProps = {
		label: string;
		position: number;
		align: 'left' | 'right';
	};

	let { label, position = $bindable(0), align = 'right' }: MeasureLineProps = $props();

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
			position = position + delta;
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
			position = position + (event.key === 'ArrowUp' ? 1 : -1);
		}
	}
</script>

<div class="measure-line" style={`transform: translateY(${position}px);`}>
	<div
		class={`measure-line__label measure-line__label--${align}`}
		role="slider"
		aria-valuenow={position}
		tabindex="0"
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
	>
		{label}
	</div>
</div>

<style>
	.measure-line {
		width: 100%;
		position: absolute;
		height: 28px;
		top: 0;
		pointer-events: none;
	}

	.measure-line::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 1px;
		background-color: red;
		top: 13.5px;
		z-index: 0;
	}

	.measure-line__label {
		width: fit-content;
		padding: 5px 10px;
		border: 1px solid red;
		margin: 0;
		display: block;
		font-size: 14px;
		border-radius: 20px;
		background-color: white;
		z-index: 1;
		position: absolute;
		font-family: var(--font-family);
		pointer-events: auto;
		cursor: ns-resize;
		user-select: none;
	}

	.measure-line__label--left {
		left: 0;
	}

	.measure-line__label--right {
		right: 0;
	}
</style>
