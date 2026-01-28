import { STYLESHEETS_LOCAL_STORAGE_KEY } from '$lib/constants';
import type { StylesheetUrl } from '$lib/types';

export function hash(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}
	return (hash >>> 0).toString(36).padStart(7, '0');
}

export function readLocalStorage<T>(key: string): T | null {
	const value = localStorage.getItem(key);
	return value ? (JSON.parse(value) as T) : null;
}

export function writeLocalStorage<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function rawInstallTextFromLocalStorage(): string {
	const stylesheets = readLocalStorage<StylesheetUrl[]>(
		STYLESHEETS_LOCAL_STORAGE_KEY
	);

	if (!stylesheets) {
		return '';
	}
	return stylesheets.map((stylesheet) => stylesheet.url).join('\n');
}
