export interface Project {
	id: number;
	name: string;
	comment_count: number;
}

export interface Payload {
	id: number;
	name: string;
	labelName?: string;
	is_completed?: boolean;
	labels?: Label[];
}

export interface Task {
	id: number;
	name: string;
	is_completed: boolean;
	labels: string[];
	comment_count: number;
	content: string;
	description: string;
	priority: number;
	project_id: number;
	section_id: number;
}

export interface TaskState {
	tasks: Task[];
}

export interface Label {
	id: number;
	name: string;
}

export interface LabelsState {
	labels: Label[];
}

export interface ModalState {
	open: boolean;
	btnText: string;
	placeholder: string;
}

export const sagaActionTypes = {
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
	| { type: typeof sagaActionTypes.REQUEST_ERROR; payload: any }
	| { type: typeof sagaActionTypes.GET_PROJECTS_SAGA }
	| { type: typeof sagaActionTypes.CREATE_NEW_PROJECT_SAGA; payload: any }
	| { type: typeof sagaActionTypes.DELETE_PROJECT; payload: any }
	| { type: typeof sagaActionTypes.EDIT_PROJECT; payload: any }
	| { type: typeof sagaActionTypes.GET_TASKS_SAGA; payload: any }
	| { type: typeof sagaActionTypes.ADD_TASK_SAGA; payload: any }
	| { type: typeof sagaActionTypes.CLOSE_TASK_SAGA; payload: any }
	| { type: typeof sagaActionTypes.DELETE_TASK_SAGA; payload: any }
	| { type: typeof sagaActionTypes.GET_LABELS_SAGA }
	| { type: typeof sagaActionTypes.ADD_LABEL_SAGA; payload: any }
	| { type: typeof sagaActionTypes.DELETE_LABEL_SAGA; payload: any }
	| { type: typeof sagaActionTypes.EDIT_LABEL_SAGA; payload: any }
	| { type: typeof sagaActionTypes.FILTER_TASK_SAGA; payload: any };
