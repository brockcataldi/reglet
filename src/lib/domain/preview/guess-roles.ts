import type { Tag } from '#lib/types.js';

/** The parts of a preview page, each set in one tag. */
export type Role =
	| 'headline'
	| 'deck'
	| 'subhead'
	| 'title'
	| 'body'
	| 'quote'
	| 'caption'
	| 'label';

export const ROLES: { id: Role; label: string }[] = [
	{ id: 'headline', label: 'Headline' },
	{ id: 'deck', label: 'Deck' },
	{ id: 'subhead', label: 'Subhead' },
	{ id: 'title', label: 'Title' },
	{ id: 'body', label: 'Body' },
	{ id: 'quote', label: 'Pull quote' },
	{ id: 'caption', label: 'Caption' },
	{ id: 'label', label: 'Label' }
];

// names a tag is likely to go by for each role, most likely first
const GUESSES: Record<Role, RegExp[]> = {
	headline: [
		/^h1$/,
		/^display(-1|-large)?$/,
		/^large-title$/,
		/^heading-(xl|07)$/,
		/^text-5xl$/,
		/^step-5$/
	],
	deck: [
		/^lead$/,
		/^body-l(arge)?$/,
		/^subtitle-1$/,
		/^text-xl$/,
		/^step-1$/
	],
	subhead: [
		/^h2$/,
		/^headline-(large|medium)$/,
		/^title-1$/,
		/^heading-(l|05)$/,
		/^text-3xl$/,
		/^step-3$/
	],
	title: [
		/^h4$/,
		/^title-(large|3)$/,
		/^heading-(s|03)$/,
		/^subtitle-2$/,
		/^text-lg$/,
		/^step-1$/
	],
	body: [
		/^body$/,
		/^body-(medium|1|02)$/,
		/^text-base$/,
		/^step-0$/,
		/^p$/
	],
	quote: [
		/^h3$/,
		/^headline-small$/,
		/^title-2$/,
		/^heading-(m|04)$/,
		/^text-2xl$/,
		/^step-2$/
	],
	caption: [
		/^small$/,
		/^caption(-1|-01)?$/,
		/^body-small$/,
		/^footnote$/,
		/^text-sm$/,
		/^step--1$/
	],
	label: [
		/^label(-large|-01)?$/,
		/^button$/,
		/^small$/,
		/^caption-2$/,
		/^text-sm$/,
		/^step--1$/
	]
};

/** A tag for every role, guessed from tag names and then sizes. */
export const guessRoles = (
	tags: Tag[],
	sizeOf: (tag: Tag) => number
): Record<Role, string | undefined> => {
	const sorted = [...tags].sort((a, b) => sizeOf(b) - sizeOf(a));
	const pick = (role: Role, fallback: Tag | undefined) => {
		for (const pattern of GUESSES[role]) {
			const tag = tags.find((t) => pattern.test(t.name.toLowerCase()));
			if (tag) return tag.id;
		}
		return fallback?.id;
	};
	const middle = sorted[Math.floor(sorted.length / 2)];

	return {
		headline: pick('headline', sorted[0]),
		deck: pick('deck', sorted[Math.floor(sorted.length / 3)]),
		subhead: pick('subhead', sorted[1]),
		title: pick('title', sorted[3]),
		body: pick('body', middle),
		quote: pick('quote', sorted[2]),
		caption: pick('caption', sorted.at(-1)),
		label: pick('label', sorted.at(-2) ?? sorted.at(-1))
	};
};
