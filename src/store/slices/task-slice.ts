import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskState } from '../../types';

interface LabelPayload {
	name: string;
}

export const taskSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
	} as TaskState,
	reducers: {
		setTasks: (state, action: PayloadAction<Task[]>) => {
			return {
				tasks: action.payload,
			};
		},

		addTask: (state, action: PayloadAction<Task>) => {
			return {
				tasks: [...state.tasks, action.payload],
			};
		},

		closeTask: (state, action: PayloadAction<number>) => {
			const task = state.tasks.find((task) => task.id === action.payload);
			if (task) {
				task.is_completed = !task.is_completed;
			}
		},

		deleteTask: (state, action: PayloadAction<number>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},

		removeLabelFromTask: (state, action: PayloadAction<LabelPayload>) => {
			state.tasks = state.tasks.map((task) => {
				task.labels = task.labels.filter(
					(name) => name !== action.payload.name
				);
				return task;
			});
		},

		filterTasks: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(
				(task) => task.labels.indexOf(action.payload) !== -1
			);
		},
	},
});

export const {
	setTasks,
	addTask,
	closeTask,
	deleteTask,
	removeLabelFromTask,
	filterTasks,
} = taskSlice.actions;
