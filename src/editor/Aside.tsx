import { Link } from "react-router";
import { cva } from "class-variance-authority";
import { Pencil, Trash, TriangleAlert } from "lucide-react";

import { cn } from "@/store/helpers";
import type { BreakpointWidth, ProjectType } from "@/store/types";
import {
	useBreakpointBase,
	useBreakpointRatio,
	useProjectType,
} from "@/store/hooks";
import { getBreakpointWidths } from "@/store/selectors";
import { updateBreakpoint, updateProjectType } from "@/store/actions";

import { IconButton } from "@/ui/Buttons";
import { Tooltip } from "@/ui/Tooltip";
import { WidthIcon } from "@/ui/WidthIcon";
import { RadioBadge, RadioBadges } from "@/ui/RadioBadges";
import RatioField from "@/ui/RatioField";
import UnitField from "@/ui/UnitField";

// import { useState } from "react";

const navigationItemVariant = cva(
	"flex w-full flex-row items-center gap-2 rounded-md border shadow-md",
	{
		variants: {
			activity: {
				inactive:
					"justify-start border-neutral-300 bg-white px-2.5 py-2.5 text-left",
				active: "justify-between border-blue-800 bg-blue-500/10 px-2.5 py-1 text-blue-800",
			},
			validity: {
				valid: "",
				invalid: "border-red-800 bg-red-500/10 text-red-800",
			},
		},
		defaultVariants: {
			activity: "inactive",
			validity: "valid",
		},
	}
);

const getNavigationLabel = (
	width: number,
	type: ProjectType,
	position: number
) => {
	if (type === "traditional") {
		return width === 0 ? `${width}px (Root)` : `${width}px`;
	}

	if (position === 0) {
		return `${width}px (Min)`;
	}

	if (position === 2) {
		return `${width}px (Max)`;
	}

	return `${width}px`;
};

type NavigationItemProps = {
	value: BreakpointWidth;
	selected: boolean;
	type: ProjectType;
	position: 0 | 1 | 2;
};

const NavigationItem = ({
	value,
	selected,
	type,
	position,
}: NavigationItemProps) => {
	const validity = type === "fluid" && position === 1 ? "invalid" : "valid";

	if (!selected) {
		return (
			<li className="w-full">
				<Link
					to={`/breakpoint/${value.id}`}
					className={cn(
						navigationItemVariant({
							activity: "inactive",
							validity,
						})
					)}
				>
					<WidthIcon value={value.width} className="size-5" />
					<span className="text-sm">
						{getNavigationLabel(value.width, type, position)}
					</span>
				</Link>
			</li>
		);
	}

	return (
		<li className="w-full">
			<span
				className={cn(
					navigationItemVariant({ activity: "active", validity })
				)}
			>
				<span className="flex flex-row items-center justify-start gap-2">
					<WidthIcon value={value.width} className="size-5" />
					<span className="text-sm">
						{getNavigationLabel(value.width, type, position)}
					</span>
				</span>

				<span className="flex flex-row">
					<Tooltip
						content={`Edit the ${value.width}px size`}
						side="bottom"
					>
						<IconButton
							size="sm"
							content={`Edit the ${value.width}px size`}
							className="rounded-r-none"
						>
							<Pencil />
						</IconButton>
					</Tooltip>
					<Tooltip
						content={`Delete the ${value.width}px size`}
						side="bottom"
					>
						<IconButton
							size="sm"
							variant="destructive"
							content={`Delete the ${value.width}px size`}
							className="rounded-l-none"
						>
							<Trash />
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
	const type = useProjectType();
	// const [rhythm, setRhythm] = useState<number>(16);

	return (
		<aside className="fixed top-0 z-10 h-dvh w-64 border-r border-r-neutral-300 bg-white/95 shadow-md">
			<div className="flex h-full flex-col p-4">
				<h1 className="sr-only">Reglet Breakpoint Editor</h1>

				<div className="flex flex-col gap-2">
					<h2 className="text-sm text-neutral-500">Project Type</h2>
					<RadioBadges
						value={type}
						onValueChange={(newType: ProjectType) => {
							updateProjectType(newType);
						}}
					>
						<RadioBadge value="traditional">
							<span>Traditional</span>
						</RadioBadge>
						<RadioBadge value="fluid">
							<span>Fluid</span>
						</RadioBadge>
					</RadioBadges>

					<h2 className="text-sm text-neutral-500">Breakpoints</h2>

					{type === "fluid" && breakpoints.length > 2 ? (
						<div
							role="alert"
							className="mb-4 grid grid-cols-[--spacing(6)_1fr] items-center gap-3 rounded-md border border-red-800 bg-red-100 p-2 text-red-800"
						>
							<TriangleAlert className="h-6 w-6" />
							<p className="text-sm">
								Fluid typography can only have a minimum and
								maximum breakpoints
							</p>
						</div>
					) : null}

					<ul className="flex flex-col items-center justify-center gap-1 rounded-md">
						{breakpoints.map((width, index) => (
							<NavigationItem
								key={`link-to-${width.id}`}
								value={width}
								selected={id === width.id}
								type={type}
								position={
									index === 0
										? 0
										: index === breakpoints.length - 1
											? 2
											: 1
								}
							/>
						))}
					</ul>
				</div>

				<hr className="my-4 text-neutral-300" />

				<div className="flex flex-col gap-2">
					<h2>Breakpoint Settings</h2>
					{base !== undefined ? (
						<div className="flex flex-col">
							<label
								htmlFor={`${id}-base`}
								className="text-sm text-neutral-500"
							>
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

					{/* {rhythm !== undefined ? (
						<div className="flex flex-col">
							<label
								htmlFor={`${id}-base`}
								className="text-sm text-neutral-500"
							>
								Rhythm
							</label>
							<UnitField
								id={`${id}-base`}
								value={rhythm}
								unit="px"
								onChange={(newRhythm: number) => {
									setRhythm(newRhythm);
								}}
							/>
						</div>
					) : null} */}

					{ratio !== undefined ? (
						<div className="flex flex-col">
							<label
								htmlFor={`${id}-base`}
								className="text-sm text-neutral-500"
							>
								Ratio
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
			</div>
		</aside>
	);
};

export default Aside;
