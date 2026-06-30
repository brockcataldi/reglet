import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createId = () => {
	return crypto.randomUUID();
};

export function write<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function read<T>(key: string): T | undefined {
	const cached = localStorage.getItem(key);

	if (cached === null) {
		return undefined;
	}

	try {
		return JSON.parse(cached) as T;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export function formatMaybePlurals(
	length: number,
	singular: string,
	plural?: string
) {
	if (length === 1) {
		return singular;
	}

	return plural ?? singular + 's';
}

export function isAbsoluteUrl(href: string): boolean {
	try {
		const url = new URL(href);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
}
