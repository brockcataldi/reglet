import { Link } from "react-router";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// import { useProjectType } from '@/project/hooks';
// import type { ProjectType } from '@/project/types';
// import { updateProjectType } from '@/project/actions';
import { getBreakpointWidths } from "@/project/selectors";

import { widthToIcon } from "@/components/helpers";
import { DescriptiveIconButton } from "@/components/ui/IconButtons";
import { Button, LinkButton } from "@/components/ui/Buttons";

type HeaderProps = {
	id: string;
};

const Header = ({ id }: HeaderProps) => {
	// const type = useProjectType();
	const breakpoints = getBreakpointWidths();

	// too many breakpoints error
	// const fluidError = type === 'fluid' && breakpoints.length > 2;
	// missing root error
	// const traditionalError = type === 'traditional' && !breakpoints.some((w) => w.width === 0);

	return (
		<header className="fixed top-0 left-0 z-10 w-full bg-neutral-50 p-2 shadow-md">
			<div className="flex flex-row items-center justify-between">
				<h1 className="sr-only">Reglet editor</h1>

				<ul className="flex flex-row items-center justify-start">
					{breakpoints.map((width) => (
						<li
							key={width.id}
							className="flex flex-row items-center justify-start"
						>
							{width.id === id ? (
								<>
									<Button
										disabled
										style={{
											borderTopRightRadius: "0",
											borderBottomRightRadius: "0",
										}}
									>
										{widthToIcon(width.width)}
										<span>
											{width.width === 0
												? "Root"
												: width.width}
										</span>
									</Button>
									<DescriptiveIconButton
										content={`Edit the ${width.width}px size`}
									>
										<PencilIcon />
									</DescriptiveIconButton>
									<DescriptiveIconButton
										content={`Delete the ${width.width}px size`}
									>
										<TrashIcon />
									</DescriptiveIconButton>
								</>
							) : (
								<>
									<LinkButton to={`/breakpoint/${width.id}`}>
										{widthToIcon(width.width)}
										<span>
											{width.width === 0
												? "Root"
												: width.width}
										</span>
									</LinkButton>
								</>
							)}
						</li>
					))}
				</ul>

				<div className="flex flex-row items-center justify-between">
					<Button>Preview</Button>
					<Button>Export</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
