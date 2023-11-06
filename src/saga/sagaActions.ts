export const sagaActions = {
	REQUEST_ERROR: 'REQUEST_ERROR',
	GET_PROJECTS_SAGA: 'GET_PROJECTS_SAGA',
	CREATE_NEW_PROJECT_SAGA: 'CREATE_NEW_PROJECT_SAGA',
	DELETE_PROJECT: 'DELETE_PROJECT',
	EDIT_PROJECT: 'EDIT_PROJECT',
	GET_TASKS_SAGA: 'GET_TASKS_SAGA',
	ADD_TASK_SAGA: 'ADD_TASK_SAGA',
	CLOSE_TASK_SAGA: 'CLOSE_TASK_SAGA',
	DELETE_TASK_SAGA: 'DELETE_TASK_SAGA',
	GET_LABELS_SAGA: 'GET_LABELS_SAGA',
	ADD_LABEL_SAGA: 'ADD_LABEL_SAGA',
	DELETE_LABEL_SAGA: 'DELETE_LABEL_SAGA',
	EDIT_LABEL_SAGA: 'EDIT_LABEL_SAGA',
	FILTER_TASK_SAGA: 'FILTER_TASK_SAGA',
};

export type SagaActionType =
	| { type: typeof sagaActions.REQUEST_ERROR; payload: any }
	| { type: typeof sagaActions.GET_PROJECTS_SAGA }
	| { type: typeof sagaActions.CREATE_NEW_PROJECT_SAGA; payload: any }
	| { type: typeof sagaActions.DELETE_PROJECT; payload: any }
	| { type: typeof sagaActions.EDIT_PROJECT; payload: any }
	| { type: typeof sagaActions.GET_TASKS_SAGA; payload: any }
	| { type: typeof sagaActions.ADD_TASK_SAGA; payload: any }
	| { type: typeof sagaActions.CLOSE_TASK_SAGA; payload: any }
	| { type: typeof sagaActions.DELETE_TASK_SAGA; payload: any }
	| { type: typeof sagaActions.GET_LABELS_SAGA }
	| { type: typeof sagaActions.ADD_LABEL_SAGA; payload: any }
	| { type: typeof sagaActions.DELETE_LABEL_SAGA; payload: any }
	| { type: typeof sagaActions.EDIT_LABEL_SAGA; payload: any }
	| { type: typeof sagaActions.FILTER_TASK_SAGA; payload: any };

export const requestError = (error: any): SagaActionType => ({
	type: sagaActions.REQUEST_ERROR,
	payload: error.data,
});

export const getProjectsAction = (): SagaActionType => ({
	type: sagaActions.GET_PROJECTS_SAGA,
});

export const createNewProjectAction = (data: any): SagaActionType => ({
	type: sagaActions.CREATE_NEW_PROJECT_SAGA,
	payload: data,
});

export const deleteProjectAction = (data: any): SagaActionType => ({
	type: sagaActions.DELETE_PROJECT,
	payload: data,
});

export const editProjectAction = (data: any): SagaActionType => ({
	type: sagaActions.EDIT_PROJECT,
	payload: data,
});

export const getTasksAction = (data: any): SagaActionType => ({
	type: sagaActions.GET_TASKS_SAGA,
	payload: data,
});

export const addNewTaskAction = (data: any): SagaActionType => ({
	type: sagaActions.ADD_TASK_SAGA,
	payload: data,
});

export const closeTaskAction = (data: any): SagaActionType => ({
	type: sagaActions.CLOSE_TASK_SAGA,
	payload: data,
});

export const deleteTaskAction = (data: any): SagaActionType => ({
	type: sagaActions.DELETE_TASK_SAGA,
	payload: data,
});

export const deleteLabelAction = (data: any): SagaActionType => ({
	type: sagaActions.DELETE_LABEL_SAGA,
	payload: data,
});
