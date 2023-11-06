import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestError, sagaActions } from './sagaActions';
import { getAxiosInstance } from '../service/api/axios';
import { API_ENDPOINTS } from '../service/api/api-endpoints';
import {
	addProject,
	deleteProject,
	setProjectName,
	setProjects,
} from '../store/slices/projects-slice';
import { AxiosResponse } from 'axios';
import { Project } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';

const axiosInstance = getAxiosInstance();

export function* createNewProjectSaga(action: PayloadAction<{ name: string }>) {
	try {
		const response: AxiosResponse = yield call(
			axiosInstance.post,
			API_ENDPOINTS.projects,
			{
				name: action.payload.name,
			}
		);
		yield put(addProject(response.data));
	} catch ({ response }) {
		yield put(requestError(response.data));
	}
}

export function* deleteProjectSaga(action: PayloadAction<number>) {
	try {
		yield call(
			axiosInstance.delete,
			API_ENDPOINTS.deleteProject(action.payload)
		);
		yield put(deleteProject(action.payload));
	} catch (error) {
		yield put(requestError(error));
	}
}

export function* editProjectSaga(
	action: PayloadAction<{ id: number; name: string }>
) {
	try {
		yield call(
			axiosInstance.post,
			API_ENDPOINTS.editProject(action.payload.id),
			{ name: action.payload.name }
		);
		yield put(setProjectName(action.payload));
	} catch (error) {
		yield put(requestError(error));
	}
}

export function* getProjectsSaga() {
	try {
		const result: AxiosResponse = yield call(
			axiosInstance.get,
			API_ENDPOINTS.projects
		);
		yield put(setProjects(result.data));
	} catch (error) {
		yield put(requestError(error));
	}
}

export default function* projectsCrudWatchers() {
	yield takeLatest(sagaActions.EDIT_PROJECT, editProjectSaga);
	yield takeLatest(sagaActions.CREATE_NEW_PROJECT_SAGA, createNewProjectSaga);
	yield takeLatest(sagaActions.DELETE_PROJECT, deleteProjectSaga);
	yield takeEvery(sagaActions.GET_PROJECTS_SAGA, getProjectsSaga);
}
