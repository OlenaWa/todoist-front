import { Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckboxList from '../checkbox-list/checkbox-list';
import ProjectActionMenu from '../menu/project-actions-menu';
import { useState } from 'react';
import './style.css';
import ProjectFormModalWindow from '../modal-window/project-form-modal-window';
import { sagaActions } from '../../saga/sagaActions';
import TaskForm from '../forms/task-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ModalState } from '../../types';

interface ProjectCardProps {
	title: string;
	id: number;
	setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProjectCard = ({ title, id, setProjectId }: ProjectCardProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const tasks = useAppSelector((state) => state.tasks.tasks);
	const [sagaAction, setIsSagaAction] = useState<string>('');
	const [modalState, setModalState] = useState<ModalState>({
		open: false,
		btnText: '',
		placeholder: '',
	});
	const dispatch = useAppDispatch();
	const [taskName, setTaskName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [priority, setPriority] = useState<number>(1);
	const [currentLabels, setCurrentLabels] = useState<string[]>([]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!taskName) {
			return;
		}

		dispatch({
			type: sagaActions[sagaAction as keyof typeof sagaActions],
			payload: {
				content: taskName,
				description: description,
				project_id: id,
				priority: priority,
				labels: currentLabels,
			},
		});
		setTaskName('');
		setDescription('');
		setPriority(1);
		setModalState({ ...modalState, open: false });
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleAddTask = () => {
		setModalState({
			...modalState,
			open: true,
		});
		setIsSagaAction('ADD_TASK_SAGA');
	};

	return (
		<>
			<Card sx={{ width: 345, flexShrink: 0, minHeight: 345 }}>
				<CardHeader
					action={
						<IconButton aria-label='settings' onClick={(e) => handleClick(e)}>
							<MoreVertIcon />
						</IconButton>
					}
					title={title}
				/>
				<Box textAlign={'left'}>
					<button className='add-task-btn' onClick={handleAddTask}>
						+ Add new task
					</button>
				</Box>
				<ProjectActionMenu
					anchorEl={anchorEl}
					setAnchorEl={setAnchorEl}
					id={id}
					setProjectId={setProjectId}
					setIsOpenModal={setModalState}
					setIsSagaAction={setIsSagaAction}
				/>
				<CardContent>
					<CheckboxList
						items={tasks.filter((task) => task.project_id === id)}
					/>
				</CardContent>
			</Card>
			<ProjectFormModalWindow modalState={modalState} setIsOpen={setModalState}>
				<TaskForm
					taskName={taskName}
					setTaskName={setTaskName}
					handleSubmit={handleSubmit}
					priority={priority}
					setPriority={setPriority}
					description={description}
					setDescription={setDescription}
					currentLabels={currentLabels}
					setCurrentLabels={setCurrentLabels}
				/>
			</ProjectFormModalWindow>
		</>
	);
};

export default ProjectCard;
