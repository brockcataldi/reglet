import type { ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

export const DialogRoot = ({ ...props }: DialogRootProps) => {
	return <DialogPrimitive.Root {...props} />;
};

type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.DialogTrigger>;

export const DialogTrigger = ({ ...props }: DialogTriggerProps) => {
	return <DialogPrimitive.DialogTrigger asChild {...props} />;
};

type DialogContentProps = {
	title: string;
	description: string;
} & ComponentProps<typeof DialogPrimitive.Content>;

export const DialogContent = ({
	title,
	description,
	children,
}: DialogContentProps) => {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
			<DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-150 translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-300 bg-white p-4 shadow-lg">
				<div className="w-full max-w-142">
					<DialogPrimitive.Title className="mb-1 text-3xl">
						{title}
					</DialogPrimitive.Title>
					<DialogPrimitive.Description className="mb-4">
						{description}
					</DialogPrimitive.Description>
					{children}
				</div>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
};

type DialogClose = ComponentProps<typeof DialogPrimitive.DialogClose>;

export const DialogClose = ({ ...props }: DialogClose) => {
	return <DialogPrimitive.DialogClose asChild {...props} />;
};
