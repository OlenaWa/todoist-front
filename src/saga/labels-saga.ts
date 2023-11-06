import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { requestError, sagaActions } from './sagaActions';
import { getAxiosInstance } from '../service/api/axios';
import { API_ENDPOINTS } from '../service/api/api-endpoints';
import {
	addLabel,
	deleteLabel,
	setLabelName,
	setLabels,
} from '../store/slices/labels-slice';
import { removeLabelFromTask } from '../store/slices/task-slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

const axiosInstance = getAxiosInstance();

export function* getLabelsSaga() {
	try {
		const result: AxiosResponse = yield call(
			axiosInstance.get,
			API_ENDPOINTS.labels
		);
		yield put(setLabels(result.data));
	} catch (error) {
		yield put(requestError(error));
	}
}

export function* addNewLabelSaga(action: PayloadAction<{ name: string }>) {
	try {
		const response: AxiosResponse = yield call(
			axiosInstance.post,
			API_ENDPOINTS.labels,
			{
				name: action.payload.name,
			}
		);
		yield put(addLabel(response.data));
	} catch ({ response }) {
		yield put(requestError(response.data));
	}
}

export function* deleteLabelSaga(
	action: PayloadAction<{ id: number; name: string }>
) {
	try {
		yield call(
			axiosInstance.delete,
			API_ENDPOINTS.deleteLabel(action.payload.id)
		);
		yield put(deleteLabel(action.payload));
		yield put(removeLabelFromTask(action.payload));
	} catch (error) {
		yield put(requestError(error));
	}
}

export function* editLabelSaga(
	action: PayloadAction<{ id: number; name: string }>
) {
	try {
		yield call(axiosInstance.post, API_ENDPOINTS.editLabel(action.payload.id), {
			name: action.payload.name,
		});
		yield put(setLabelName(action.payload));
	} catch (error) {
		yield put(requestError(error));
	}
}

export default function* labelsCrudWatchers() {
	yield takeLatest(sagaActions.GET_LABELS_SAGA, getLabelsSaga);
	yield takeLatest(sagaActions.ADD_LABEL_SAGA, addNewLabelSaga);
	yield takeLatest(sagaActions.EDIT_LABEL_SAGA, editLabelSaga);
	yield takeEvery(sagaActions.DELETE_LABEL_SAGA, deleteLabelSaga);
}
