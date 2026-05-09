type StatProps = {
	label: string;
	value: string;
};

export const Stat = ({ label, value }: StatProps) => {
	return (
		<div className="flex flex-col items-start justify-start">
			<p className="text-sm font-normal text-neutral-500">{label}</p>
			<p>
				<strong className="text-sm font-bold">{value}</strong>
			</p>
		</div>
	);
};
