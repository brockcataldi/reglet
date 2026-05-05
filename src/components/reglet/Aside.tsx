import { useBreakpointBase, useBreakpointRatio } from "@/project/hooks";

import { updateBreakpoint } from "@/project/actions";

import RatioField from "@/components/ui/RatioField";
import UnitField from "@/components/ui/UnitField";

import type { ComponentProps } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// import { useProjectType } from '@/project/hooks';
// import type { ProjectType } from '@/project/types';
// import { updateProjectType } from '@/project/actions';
import { getBreakpointWidths } from "@/project/selectors";

import { Button, LinkButton, IconButton } from "@/components/ui/Buttons";
import { Link } from "react-router";
import type { BreakpointWidth } from "@/project/types";

import {
	ComputerDesktopIcon,
	DevicePhoneMobileIcon,
	DeviceTabletIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "../ui/Tooltip";

type WidthIconProps = {
	value: number;
} & ComponentProps<"svg">;

export const WidthIcon = ({ value, ...props }: WidthIconProps) => {
	if (value > 1199) {
		return <ComputerDesktopIcon {...props} />;
	}

	if (value > 767) {
		return <DeviceTabletIcon {...props} />;
	}

	return <DevicePhoneMobileIcon {...props} />;
};

type HeaderNavigationItemProps = {
	value: BreakpointWidth;
	selected: boolean;
};

const HeaderNavigationItem = ({
	value,
	selected,
}: HeaderNavigationItemProps) => {
	if (!selected) {
		return (
			<li className="w-full">
				<Link
					to={`/breakpoint/${value.id}`}
					className="flex w-full flex-row items-center justify-start gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-left"
				>
					<WidthIcon value={value.width} className={"size-5"} />
					<span className="text-sm">
						{value.width === 0 ? "Root" : value.width}
					</span>
				</Link>
			</li>
		);
	}

	return (
		<li className="w-full">
			<span className="flex w-full flex-row items-center justify-between gap-2 rounded-md border border-blue-800 bg-blue-500/10 px-4 py-1 text-blue-800">
				<span className="flex flex-row items-center justify-start gap-2">
					<WidthIcon value={value.width} className={"size-5"} />
					<span className="text-sm">
						{value.width === 0 ? "Root" : value.width}
					</span>
				</span>

				<span className="flex flex-row">
					<Tooltip
						content={`Edit the ${value.width}px size`}
						side="bottom"
					>
						<IconButton
							size={"sm"}
							content={`Edit the ${value.width}px size`}
							className={"rounded-r-none"}
						>
							<PencilIcon />
						</IconButton>
					</Tooltip>
					<Tooltip
						content={`Delete the ${value.width}px size`}
						side="bottom"
					>
						<IconButton
							size={"sm"}
							variant="destructive"
							content={`Delete the ${value.width}px size`}
							className={"rounded-l-none"}
						>
							<TrashIcon />
						</IconButton>
					</Tooltip>
				</span>
			</span>
		</li>
	);
};

type AsideProps = {
	id: string;
};

const Aside = ({ id }: AsideProps) => {
	const breakpoints = getBreakpointWidths();
	const base = useBreakpointBase(id);
	const ratio = useBreakpointRatio(id);

	return (
		<aside className="fixed top-0 h-dvh w-64 border-r border-r-neutral-300 bg-white/95 shadow-md">
			<div className="flex h-full flex-col p-4">
				<h1 className="sr-only">Reglet</h1>

				<h2 className="text-sm text-neutral-500">Breakpoints</h2>
				<ul className="flex flex-col items-center justify-center gap-1 rounded-md">
					{breakpoints.map((width) => (
						<HeaderNavigationItem
							value={width}
							selected={id === width.id}
						/>
					))}
				</ul>

				{base !== undefined ? (
					<div className="flex flex-col">
						<label htmlFor={`${id}-base`} className="text-sm">
							Base Font Size
						</label>
						<UnitField
							id={`${id}-base`}
							value={base}
							onChange={(newBase: number) => {
								updateBreakpoint(id, {
									base: newBase,
								});
							}}
						/>
					</div>
				) : null}

				{ratio !== undefined ? (
					<div className="flex flex-col">
						<label htmlFor={`${id}-base`} className="text-sm">
							Base Font Size
						</label>
						<RatioField
							id={`${id}-ratio`}
							value={ratio}
							onChange={(newRatio: number) => {
								updateBreakpoint(id, {
									ratio: newRatio,
								});
							}}
						/>
					</div>
				) : null}
			</div>
		</aside>
	);
};

export default Aside;
