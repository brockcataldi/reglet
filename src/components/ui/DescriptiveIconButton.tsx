import {
	IconButton,
	Tooltip,
	VisuallyHidden,
	type IconButtonProps,
} from '@radix-ui/themes';

type DescriptiveIconButtonProps = {
	content: string;
} & IconButtonProps;

const DescriptiveIconButton = (props: DescriptiveIconButtonProps) => {
	const { content, children, ...rest } = props;

	return (
		<Tooltip content={content}>
			<IconButton {...rest}>
				{children}
				<VisuallyHidden>{content}</VisuallyHidden>
			</IconButton>
		</Tooltip>
	);
};

export default DescriptiveIconButton;
