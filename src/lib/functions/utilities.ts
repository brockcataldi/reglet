import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function readLocalStorage<T>(key: string): T | null {
	const value = localStorage.getItem(key);

	try {
		return value ? (JSON.parse(value) as T) : null;
	} catch {
		return null;
	}
}

export function writeLocalStorage<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}
