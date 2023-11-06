import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { closeTaskAction, deleteTaskAction } from '../../saga/sagaActions';
import cn from 'classnames';
import './style.css';
import { Chip } from '@mui/material';

interface CheckboxListProps {
	items: {
		id: number;
		content: string;
		description: string;
		is_completed: boolean;
		priority: number;
		labels: string[];
	}[];
}

export default function CheckboxList({ items }: CheckboxListProps) {
	const [checked, setChecked] = useState([0]);
	const dispatch = useDispatch();
	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		dispatch(closeTaskAction(value));

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	const handleDeleteTask = (value: number) => {
		dispatch(deleteTaskAction(value));
	};

	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			{items.map((item) => {
				const labelId = `checkbox-list-label-${item.id}`;

				return (
					<div className='task' key={item.id}>
						<ListItem
							className={cn({ 'completed-task': item.is_completed })}
							secondaryAction={
								<IconButton
									onClick={() => handleDeleteTask(item.id)}
									edge='end'
									aria-label='comments'
								>
									<DeleteIcon />
								</IconButton>
							}
							disablePadding
						>
							<ListItemButton
								role={undefined}
								onClick={handleToggle(item.id)}
								dense
							>
								<ListItemIcon>
									<Checkbox
										edge='start'
										checked={checked.indexOf(item.id) !== -1}
										tabIndex={-1}
										disableRipple
										inputProps={{ 'aria-labelledby': labelId }}
									/>
								</ListItemIcon>
								<ListItemText
									id={labelId}
									primary={item.content}
									secondary={item.description}
									className={`priority-${item.priority}`}
								/>
							</ListItemButton>
						</ListItem>
						<div className='labels'>
							{item.labels.map((label) => (
								<Chip
									key={label}
									label={label}
									variant='outlined'
									className='label-chip'
								/>
							))}
						</div>
					</div>
				);
			})}
		</List>
	);
}
