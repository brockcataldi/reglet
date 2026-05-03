import { useBreakpointBase, useBreakpointRatio } from "@/project/hooks";

import { updateBreakpoint } from "@/project/actions";

import RatioField from "@/components/ui/RatioField";
import UnitField from "@/components/ui/UnitField";

type AsideProps = {
	id: string;
};

const Aside = ({ id }: AsideProps) => {
	const base = useBreakpointBase(id);
	const ratio = useBreakpointRatio(id);

	return (
		<aside className="fixed top-10 z-5 h-[calc(100dvh-40px)] w-64 bg-neutral-100 shadow-md">
			<div className="flex h-full flex-col gap-4 p-4">
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
