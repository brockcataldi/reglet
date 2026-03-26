import {
	createContext,
	useState,
	useCallback,
	type ReactNode,
	useContext,
} from 'react';

import type { Project, Unit } from '../types';

type ProjectContextType = {
	project: Project;
	setUnit: (unit: Unit) => void;
	setPrecision: (precision: number) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectProviderProps = {
	children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
	const [project, setProject] = useState<Project>({
		unit: 'rem',
		precision: 3,
	});

	const setUnit = useCallback((unit: Unit) => {
		setProject((prev) => ({ ...prev, unit: unit }));
	}, []);

	const setPrecision = useCallback((precision: number) => {
		setProject((prev) => ({ ...prev, precision: precision }));
	}, []);

	return (
		<ProjectContext.Provider value={{ project, setUnit, setPrecision }}>
			{children}
		</ProjectContext.Provider>
	);
};

export const useProject = () => {
	const context = useContext(ProjectContext);

	if (!context) {
		throw new Error('must be used within ProjectProvider');
	}

	return context;
};
