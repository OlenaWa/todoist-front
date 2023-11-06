import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { projectsSlice } from './slices/projects-slice';
import { rootSaga } from '../saga';
import { taskSlice } from './slices/task-slice';
import { labelsSlice } from './slices/labels-slice';

let getProjectsSagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		projects: projectsSlice.reducer,
		tasks: taskSlice.reducer,
		labels: labelsSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(getProjectsSagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

getProjectsSagaMiddleware.run(rootSaga);
