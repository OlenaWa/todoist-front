import { sagaActions } from '../saga/sagaActions';

export interface RequestErrorAction {
	type: sagaActions.REQUEST_ERROR;
	payload: any;
}

export interface GetProjectsAction {
	type: sagaActions.GET_PROJECTS_SAGA;
}

export interface CreateNewProjectAction {
	type: sagaActions.CREATE_NEW_PROJECT_SAGA;
	payload: any;
}

export interface DeleteProjectAction {
	type: sagaActions.DELETE_PROJECT;
	payload: any;
}

export interface EditProjectAction {
	type: sagaActions.EDIT_PROJECT;
	payload: any;
}

export interface GetTasksAction {
	type: sagaActions.GET_TASKS_SAGA;
	payload: any;
}

export interface AddNewTaskAction {
	type: sagaActions.ADD_TASK_SAGA;
	payload: any;
}

export interface CloseTaskAction {
	type: sagaActions.CLOSE_TASK_SAGA;
	payload: any;
}

export interface DeleteTaskAction {
	type: sagaActions.DELETE_TASK_SAGA;
	payload: any;
}

export interface DeleteLabelAction {
	type: sagaActions.DELETE_LABEL_SAGA;
	payload: any;
}
