import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, Payload } from '../../types';

interface ProjectsState {
	projects: Project[];
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState: {
		projects: [],
	} as ProjectsState,
	reducers: {
		setProjects: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload;
		},

		setProjectName: (state, action: PayloadAction<Payload>) => {
			const { id, name } = action.payload;
			const item = state.projects.find((project) => project.id === id);
			if (item) {
				item.name = name;
			}
		},

		addProject: (state, action: PayloadAction<Project>) => {
			return {
				projects: [...state.projects, action.payload],
			};
		},

		deleteProject: (state, action: PayloadAction<number>) => {
			state.projects = state.projects.filter(
				(project) => project.id !== action.payload
			);
		},
	},
});

export const { setProjects, setProjectName, addProject, deleteProject } =
	projectsSlice.actions;
