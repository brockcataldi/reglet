<script lang="ts">
	import { DEVICES, type DeviceType } from '$lib/constants';

	import { formatBreakpointLabel } from '$lib/utilities';
	import { toRanges } from '$lib/project/to-ranges';

	import project from '$lib/stores/project.svelte';

	import Checkbox from '$lib/ui/form/checkbox.svelte';
	import Separator from '$lib/ui/display/separator.svelte';

	let visibleDevices = $state<string[]>([
		'iphone-16',
		'iphone-16-pro-max',
		'ipad-mini',
		'ipad-pro-11',
		'ipad-pro-12-9',
		'macbook-air-13',
		'macbook-pro-16',
		'monitor-1080p'
	]);

	let widths = $derived(
		project.sortedBreakpoints.map((breakpoint) => ({
			width: breakpoint.width,
			id: breakpoint.id
		}))
	);

	let [ranges, scale] = $derived(toRanges(widths));

	type Device = {
		slug: string;
		name: string;
		width: number;
		position: string;
		type: DeviceType;
		orientation: 'tt' | 'tb' | 'bt' | 'bb';
		offscreen: boolean;
	};

	let devices = $derived(
		DEVICES.map(
			(device): Device => ({
				slug: device.slug,
				name: device.name,
				width: device.width,
				orientation: device.orienation,
				type: device.type,

				position: `${(device.width / scale) * 100}%`,
				offscreen: device.width > scale
			})
		)
	);

	let typeGroups = $derived(
		Object.groupBy(devices, (device) => device.type)
	);

	let orientationGroups = $derived(
		Object.groupBy(
			devices.filter((device) => visibleDevices.includes(device.slug)),
			(device) => device.orientation
		)
	);

	const toggleVisibleDevice = (slug: string, checked: boolean) => {
		if (checked) {
			visibleDevices = [...visibleDevices, slug];
		} else {
			visibleDevices = visibleDevices.filter((item) => item !== slug);
		}
	};
</script>

<div class="w-full">
	<div class="relative w-full pb-30">
		{#each orientationGroups.tt as device (`tt-${device.slug}`)}
			<div
				class="absolute bottom-0 left-(--alignment-position) w-fit -translate-x-1/2"
				style:--alignment-position={device.position}
			>
				<p class="text-sm font-bold">{device.name}</p>
				<p class="text-xs">{device.width}px</p>
				<div class="mx-auto h-12 w-px bg-neutral-500"></div>
			</div>
		{/each}

		{#each orientationGroups.tb as device (`tb-${device.slug}`)}
			<div
				class="absolute bottom-0 left-(--alignment-position) w-fit -translate-x-1/2"
				style:--alignment-position={device.position}
			>
				<p class="text-sm font-bold">{device.name}</p>
				<p class="text-xs">{device.width}px</p>
				<div class="mx-auto h-4 w-px bg-neutral-500"></div>
			</div>
		{/each}
	</div>
	<div class="flex w-full flex-row items-end justify-center">
		{#each ranges as range (`range-${range.id}`)}
			<div
				class="w-(--range-width) border border-black p-2 not-first:border-l-0"
				style:--range-width={range.percent}
			>
				<p class="font-mono text-sm">
					{formatBreakpointLabel(range.start)}
				</p>
				<p class="font-mono text-xs">
					{range.start}px to {range.end}px
				</p>
			</div>
		{/each}
	</div>
	<div class="relative w-full pb-30">
		{#each orientationGroups.bt as device (`bt-${device.slug}`)}
			<div
				class="absolute top-0 left-(--alignment-position) w-fit -translate-x-1/2"
				style:--alignment-position={device.position}
			>
				<div class="mx-auto h-4 w-px bg-neutral-500"></div>
				<p class="text-sm font-bold">{device.name}</p>
				<p class="text-xs">{device.width}px</p>
			</div>
		{/each}
		{#each orientationGroups.bb as device (`bb-${device.slug}`)}
			<div
				class="absolute top-0 left-(--alignment-position) w-fit -translate-x-1/2"
				style:--alignment-position={device.position}
			>
				<div class="mx-auto h-12 w-px bg-neutral-500"></div>
				<p class="text-sm font-bold">{device.name}</p>
				<p class="text-xs">{device.width}px</p>
			</div>
		{/each}
	</div>

	<h3 class="mb-4 text-4xl font-bold tracking-tighter text-black">
		Toggle Devices
	</h3>
	<ul class="grid grid-cols-4 gap-2">
		{#each Object.entries(typeGroups) as group (`group-type-${group[0]}`)}
			<li>
				<Separator as="p">{group[0]}</Separator>
				<ul>
					{#each group[1] as device (`checkbox-${device.slug}`)}
						<li>
							<Checkbox
								id={device.name}
								label={device.name}
								value={device.slug}
								checked={visibleDevices.includes(device.slug)}
								onchange={(event) => {
									toggleVisibleDevice(
										device.slug,
										event.currentTarget.checked
									);
								}}
							/>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
