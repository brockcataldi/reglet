import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createProject, type Project } from '@/project';

export const projectStore = create<Project>()(
	persist(
		immer(() => createProject('rem', 'traditional')),
		{
			name: 'project',
		}
	)
);
