export const API_ENDPOINTS = {
	projects: '/projects',
	deleteProject: (id) => `/projects/${id}`,
	editProject: (id) => `/projects/${id}`,
	tasks: 'tasks',
	closeTask: (id) => `/tasks/${id}/close`,
	deleteTask: (id) => `/tasks/${id}`,
	labels: '/labels',
	deleteLabel: (id) => `/labels/${id}`,
	editLabel: (id) => `/labels/${id}`,
};
