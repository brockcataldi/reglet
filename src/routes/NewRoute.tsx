import { useState } from "react";

import { TriangleAlert } from "lucide-react";

import type { ProjectType, Unit } from "@/store/types";
import { updateNewProject } from "@/store/actions";

import { RadioCards, RadioCard } from "@/ui/RadioCards";
import { LinkButton } from "@/ui/Buttons";

const NewRoute = () => {
	const [unit, setUnit] = useState<Unit>("rem");
	const [type, setType] = useState<ProjectType>("traditional");

	const previousProjectExists = localStorage.getItem("project");

	const onChangeUnit = (newUnit: Unit) => {
		setUnit(newUnit);
	};

	const onChangeType = (newType: ProjectType) => {
		setType(newType);
	};

	const onClickNewProject = () => {
		updateNewProject(unit, type);
	};

	return (
		<main className="mx-auto max-w-2xl">
			<header className="py-5">
				<h1 className="text-7xl font-bold">New Project</h1>
				<p>Don't worry all of these settings can be changed.</p>
			</header>

			<hr className="my-5" />

			<section className="py-5">
				<h2 className="text-4xl font-bold">Select a Unit Type</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<div>
					<RadioCards
						aria-label="Select a Unit Type"
						className="mt-4 grid grid-cols-3 gap-3"
						value={unit}
						onValueChange={onChangeUnit}
					>
						<RadioCard value="rem" id="unit-rem">
							<code className="block font-mono text-lg">rem</code>
							<span className="text-sm">
								Relative to the root font size; best for
								scalable, accessible type.
							</span>
						</RadioCard>
						<RadioCard value="px" id="unit-px">
							<code className="block font-mono text-lg">px</code>
							<span className="text-sm">
								Fixed pixel units; best when you need exact,
								device-independent sizing.
							</span>
						</RadioCard>
						<RadioCard value="pt" id="unit-pt">
							<code className="block font-mono text-lg">pt</code>
							<span className="text-sm">
								Print-oriented points; mainly for print styles,
								not typical screen UI type.
							</span>
						</RadioCard>
					</RadioCards>
				</div>
			</section>

			<section className="py-5">
				<h2 className="text-4xl font-bold">Select a Project Type</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<div>
					<RadioCards
						aria-label="Select a Unit Type"
						className="mt-4 grid grid-cols-2 gap-3"
						value={type}
						onValueChange={onChangeType}
					>
						<RadioCard value="traditional" id="unit-traditional">
							<strong className="block text-lg">
								Traditional
							</strong>
							<span className="text-sm">
								Type sizes change at specific screen widths
								using set breakpoints.
							</span>
						</RadioCard>
						<RadioCard value="fluid" id="unit-fluid">
							<strong className="block text-lg">Fluid</strong>
							<span className="text-sm">
								Type scales smoothly between sizes based on the
								viewport or container.
							</span>
						</RadioCard>
					</RadioCards>
				</div>
			</section>

			<hr className="my-5" />

			<section className="py-5">
				{!previousProjectExists ? null : (
					<div
						role="alert"
						className="mb-4 flex flex-row items-center justify-start gap-4 rounded-md border border-red-800 bg-red-100 px-4 py-2 text-red-800"
					>
						<TriangleAlert className="h-8 w-8" />
						<p>
							It seems you've already create a project,{" "}
							<strong>
								creating a new project will overwrite that
								project.
							</strong>
						</p>
					</div>
				)}

				<div className="flex flex-row items-center justify-start gap-3">
					<LinkButton
						variant={
							previousProjectExists ? "destructive" : "primary"
						}
						to="/breakpoint"
						onClick={onClickNewProject}
					>
						Create New Project
					</LinkButton>

					{!previousProjectExists ? null : (
						<LinkButton to="/breakpoint">
							Resume Previous Project
						</LinkButton>
					)}
				</div>
			</section>
		</main>
	);
};

export default NewRoute;
