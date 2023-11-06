import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sagaActions } from '../../saga/sagaActions';
import { RootState } from '../../store/store';
import ProjectForm from '../forms/project-form';
import LalelsFilter from '../labels/labels-filter';
import Header from '../layout/header/header';
import ProjectFormModalWindow from '../modal-window/project-form-modal-window';
import ProjectCard from '../project-card/project-card';
import './style.css';
import { ModalState } from '../../types';

const ProjectsList = () => {
	const dispatch = useAppDispatch();
	const projects = useAppSelector(
		(state: RootState) => state.projects.projects
	);
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		btnText: '',
		placeholder: '',
	});
	const [projectName, setProjectName] = useState<string>('');
	const [projectId, setProjectId] = useState<number | null>(null);
	const [sagaAction, setIsSagaAction] = useState<string>('');

	useEffect(() => {
		dispatch({ type: sagaActions.GET_PROJECTS_SAGA });
		dispatch({ type: sagaActions.GET_TASKS_SAGA });
		dispatch({ type: sagaActions.GET_LABELS_SAGA });
	}, [dispatch]);

	const headerBtnHandleClick = () => {
		setModalState({ open: true, btnText: 'Save', placeholder: 'Project name' });
		setProjectName('');
		setIsSagaAction('CREATE_NEW_PROJECT_SAGA');
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!projectName) {
			return;
		}
		dispatch({
			type: sagaActions[sagaAction as keyof typeof sagaActions],
			payload: { name: projectName, id: projectId },
		});
		setModalState({ ...modalState, open: false });
	};

	return (
		<>
			<Header
				title={'Projects'}
				btnText={'Add Project'}
				handleClick={headerBtnHandleClick}
			/>
			<LalelsFilter />
			<div className='temp'>
				<div className='projects-wrapper'>
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							title={project.name}
							id={project.id}
							setProjectId={setProjectId}
						/>
					))}
				</div>
			</div>
			<ProjectFormModalWindow setIsOpen={setModalState} modalState={modalState}>
				<ProjectForm
					handleSubmit={handleSubmit}
					projectName={projectName}
					setProjectName={setProjectName}
					placeholder={modalState.placeholder}
					btnText={modalState.btnText}
				/>
			</ProjectFormModalWindow>
		</>
	);
};

export default ProjectsList;
