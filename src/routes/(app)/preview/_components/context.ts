import { getContext, setContext } from 'svelte';
import type { Attachment } from 'svelte/attachments';

import type { Role } from '#lib/domain/preview/guess-roles.js';

/** What a preview page needs from the annotated frame around it. */
export type PreviewContext = {
	// inline style for a role's tag at the page's width
	style: (role: Role) => string;
	// classes for a role's text, highlighted while its tag is being picked
	mark: (role: Role, classes?: string) => string;
	// style and classes together, to spread onto a role's text
	text: (role: Role, classes?: string) => { style: string; class: string };
	// marks where a role's note lines up
	anchor: (role: Role) => Attachment<HTMLElement>;
};

const KEY = Symbol('preview');

export const setPreview = (context: PreviewContext) =>
	setContext(KEY, context);

export const getPreview = () => getContext<PreviewContext>(KEY);
