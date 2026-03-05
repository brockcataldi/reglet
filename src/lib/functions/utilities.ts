import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
}

export const readLocalStorage = <T>(key: string): T | null => {
	const value = localStorage.getItem(key);

	try {
		return value ? (JSON.parse(value) as T) : null;
	} catch {
		return null;
	}
}

export const writeLocalStorage = <T>(key: string, value: T) => {
	localStorage.setItem(key, JSON.stringify(value));
}

export const isStringArray = (raw: unknown): raw is string[] => {
	if (!Array.isArray(raw)) {
		return false;
	}

	for (const value of raw) {
		if (typeof value !== 'string') {
			return false;
		}
	}

	return true;
};

export const uniques = <T, K>(
	items: T[] | undefined,
	key: (item: T) => K
): K[] | undefined => {
	return items ? [...new Set(items.map(key))] : undefined;
};
