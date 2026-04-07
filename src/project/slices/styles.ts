import { projectStore } from '../store';
import type { Style } from '../types';

export const useStyles = () => {
	return projectStore((state) => state.styles);
};

export const useStylesLength = () => {
	return projectStore((state) => state.styles.length);
};

export const useStyle = (id: string) => {
	return projectStore((state) =>
		state.styles.find((style) => style.id === id)
	);
};

export const updateStyle = (id: string, values: Partial<Style>) => {
	projectStore.setState((state) => {
		const index = state.styles.findIndex((style) => style.id === id);

		if (index === -1) {
			return;
		}

		state.styles[index] = {
			...state.styles[index],
			...values,
		};
	});
};
