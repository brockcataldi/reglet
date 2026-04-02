import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Project } from './types';
import { createProject } from './helpers';

export const projectStore = create<Project>()(
	persist(
		immer(() => createProject('rem', 'traditional')),
		{
			name: 'project',
		}
	)
);
