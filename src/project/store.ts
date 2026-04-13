import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createProject } from '@/project/creators';
import { type Project } from '@/project/types';

export const projectStore = create<Project>()(
	persist(
		immer(() => createProject('rem', 'traditional')),
		{
			name: 'project',
			version: 1,
			migrate: () => createProject('rem', 'traditional'),
		}
	)
);
