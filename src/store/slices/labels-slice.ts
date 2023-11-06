import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Label, LabelsState } from '../../types';

interface AddLabelPayload {
	id: number;
	name: string;
}

interface SetLabelNamePayload {
	id: number;
	name: string;
}

interface DeleteLabelPayload {
	id: number;
}

export const labelsSlice = createSlice({
	name: 'labels',
	initialState: {
		labels: [],
	} as LabelsState,
	reducers: {
		setLabels: (state, action: PayloadAction<Label[]>) => {
			state.labels = action.payload;
		},

		addLabel: (state, action: PayloadAction<AddLabelPayload>) => {
			state.labels.push({ id: action.payload.id, name: action.payload.name });
		},

		setLabelName: (state, action: PayloadAction<SetLabelNamePayload>) => {
			const { id, name } = action.payload;
			const label = state.labels.find((label) => label.id === id);
			if (label) {
				label.name = name;
			}
		},

		deleteLabel: (state, action: PayloadAction<DeleteLabelPayload>) => {
			state.labels = state.labels.filter(
				(label) => label.id !== action.payload.id
			);
		},
	},
});

export const { setLabels, addLabel, deleteLabel, setLabelName } =
	labelsSlice.actions;
