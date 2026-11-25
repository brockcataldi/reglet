/** Generic families a font can fall back to; empty means none. */
export const FALLBACKS = [
	'sans-serif',
	'serif',
	'monospace',
	'cursive',
	'fantasy',
	'system-ui',
	''
] as const;

export type Fallback = (typeof FALLBACKS)[number];

export const isFallback = (value: unknown): value is Fallback =>
	FALLBACKS.includes(value as Fallback);

/** A first guess from the family's name; sans-serif when it gives nothing. */
export const guessFallback = (family: string): Fallback => {
	const name = family.trim().toLowerCase();

	if (/\b(mono|code)\b|monospace/.test(name)) return 'monospace';
	if (/\bsans\b/.test(name)) return 'sans-serif';
	if (/serif|\bslab\b/.test(name)) return 'serif';
	if (/\b(script|hand|brush)\b/.test(name)) return 'cursive';

	return 'sans-serif';
};
