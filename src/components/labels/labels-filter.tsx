import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { sagaActions } from '../../saga/sagaActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { filterTasks } from '../../store/slices/task-slice';
import ProjectForm from '../forms/project-form';
import LabelActionMenu from '../menu/labels-actions-menu';
import ProjectFormModalWindow from '../modal-window/project-form-modal-window';
import './style.css';

const LalelsFilter = () => {
	const { labels } = useAppSelector((state) => state.labels);
	const dispatch = useAppDispatch();
	const [labelName, setLabelName] = useState('');
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const [sagaAction, setSagaAction] = useState('');
	const [modalState, setModalState] = useState({
		open: false,
		btnText: 'Add label',
		placeholder: 'Enter label',
	});
	const [currentLabel, setCurrentLabel] = useState('');

	const handleClick = () => {
		setModalState({ ...modalState, open: true });
		setSagaAction('ADD_LABEL_SAGA');
	};

	const handleChange = (value: string) => {
		setCurrentLabel(value);
		dispatch(filterTasks(value));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!labelName) {
			return;
		}

		dispatch({
			type: sagaActions[sagaAction as keyof typeof sagaActions],
			payload: {
				name: labelName,
			},
		});

		setModalState({ ...modalState, open: false });
	};

	return (
		<>
			<div className='labels-filter'>
				<Button variant='contained' onClick={handleClick}>
					Add new label
				</Button>
				{labels.map((label) => (
					<>
						<RadioGroup
							row
							aria-labelledby='demo-row-radio-buttons-group-label'
							name='row-radio-buttons-group'
							value={currentLabel}
							onChange={(e) => handleChange(e.target.value)}
						>
							<FormControlLabel
								value={label.name}
								control={<Radio />}
								label={
									<span
										onClick={(event) => {
											setAnchorEl(event.currentTarget);
										}}
									>
										{label.name}
									</span>
								}
							/>
						</RadioGroup>
						<div className='label-action-menu'>
							<LabelActionMenu
								id={label.id}
								name={label.name}
								anchorEl={anchorEl}
								setAnchorEl={setAnchorEl}
							/>
						</div>
					</>
				))}
			</div>
			<ProjectFormModalWindow modalState={modalState} setIsOpen={setModalState}>
				<ProjectForm
					handleSubmit={handleSubmit}
					projectName={labelName}
					setProjectName={setLabelName}
					placeholder={modalState.placeholder}
					btnText={modalState.btnText}
				/>
			</ProjectFormModalWindow>
		</>
	);
};

export default LalelsFilter;
