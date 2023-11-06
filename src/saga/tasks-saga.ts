import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestError, sagaActions } from './sagaActions';
import { getAxiosInstance } from '../service/api/axios';
import { API_ENDPOINTS } from '../service/api/api-endpoints';
import {
	setTasks,
	addTask,
	deleteTask,
	closeTask,
} from '../store/slices/task-slice';
import { Task } from '../types';
import { AxiosResponse } from 'axios';

const axiosInstance = getAxiosInstance();

export function* getTasksSaga() {
	try {
		const result: AxiosResponse = yield call(
			axiosInstance.get,
			API_ENDPOINTS.tasks
		);
		yield put(setTasks(result.data));
	} catch (error) {
		yield put(requestError(error));
	}
}

export function* addNewTaskSaga(action: { payload: Task }) {
	const { content, project_id, priority, description, labels } = action.payload;
	try {
		const response: AxiosResponse = yield call(
			axiosInstance.post,
			API_ENDPOINTS.tasks,
			{
				content: content,
				project_id: project_id,
				priority: priority,
				description: description,
				labels: labels,
			}
		);
		yield put(addTask(response.data));
	} catch ({ response }) {
		yield put(requestError(response.data));
	}
}

export function* closeTaskSaga(action: { payload: number }) {
	try {
		yield call(axiosInstance.post, API_ENDPOINTS.closeTask(action.payload));
		yield put(closeTask(action.payload));
	} catch ({ response }) {
		yield put(requestError(response.data));
	}
}

export function* deleteTaskSaga(action: { payload: number }) {
	try {
		yield call(axiosInstance.delete, API_ENDPOINTS.deleteTask(action.payload));
		yield put(deleteTask(action.payload));
	} catch (error) {
		yield put(requestError(error));
	}
}

export default function* tasksCrudWatchers() {
	yield takeEvery(sagaActions.GET_TASKS_SAGA, getTasksSaga);
	yield takeLatest(sagaActions.ADD_TASK_SAGA, addNewTaskSaga);
	yield takeLatest(sagaActions.CLOSE_TASK_SAGA, closeTaskSaga);
	yield takeLatest(sagaActions.DELETE_TASK_SAGA, deleteTaskSaga);
}
