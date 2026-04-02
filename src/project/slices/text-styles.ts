import { projectStore } from '../store';

export const useTextStyles = () => {
	return projectStore((state) => state.textStyles);
};

export const useTextStylesLength = () => {
	return projectStore((state) => state.textStyles.length);
};
