import { all } from 'redux-saga/effects';
import labelsCrudWatchers from './labels-saga';
import projectsSaga from './projects-saga';
import tasksCrudWatchers from './tasks-saga';

export function* rootSaga() {
	yield all([projectsSaga(), tasksCrudWatchers(), labelsCrudWatchers()]);
}
