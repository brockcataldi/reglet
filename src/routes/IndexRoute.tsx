import { LinkButton } from '@/components/ui/Buttons';

const IndexRoute = () => {
	return (
		<div className="grid h-dvh w-full place-items-center">
			<main className="mx-auto max-w-xl">
				<h1 className="mb-2 text-7xl font-bold">Reglet</h1>

				<div className="flex flex-row items-center justify-start gap-4">
					<p className="text-xl">reg&middot;let</p>
					<p className="text-xl">
						<strong>noun</strong>
					</p>
				</div>
				<hr className="my-5" />
				<ol className="list-decimal pl-5">
					<li>a flat narrow architectural molding</li>
					<li>
						a strip of wood used like a lead between lines of type
					</li>
					<li>
						<strong>a system to build type systems</strong>
					</li>
				</ol>

				<div className="mt-5">
					<LinkButton to="/new">Create New Project</LinkButton>
				</div>
			</main>
		</div>
	);
};

export default IndexRoute;
