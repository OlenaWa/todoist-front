import {
	Button,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './forms.css';
import { useAppSelector } from '../../store/hooks';

interface TaskFormProps {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	taskName: string;
	setTaskName: (value: string) => void;
	priority: number;
	setPriority: (value: number) => void;
	description: string;
	setDescription: (value: string) => void;
	currentLabels: string[];
	setCurrentLabels: (value: string[]) => void;
}

const TaskForm = ({
	handleSubmit,
	taskName,
	setTaskName,
	priority,
	setPriority,
	description,
	setDescription,
	currentLabels,
	setCurrentLabels,
}: TaskFormProps) => {
	const labels = useAppSelector((state) => state.labels.labels);
	return (
		<form
			onSubmit={(event) => handleSubmit(event)}
			className='create-project-form'
		>
			<TextField
				id='taskName'
				label={'Add a new task'}
				variant='outlined'
				value={taskName}
				onInput={(e) => setTaskName((e.target as HTMLInputElement).value)}
			/>
			<TextField
				id='taskDescription'
				label={'Description'}
				variant='outlined'
				value={description}
				onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
			/>
			<FormControl>
				<FormLabel id='demo-row-radio-buttons-group-label'>Priority</FormLabel>
				<RadioGroup
					row
					aria-labelledby='demo-row-radio-buttons-group-label'
					name='row-radio-buttons-group'
					value={priority}
					onChange={(e) => setPriority(Number(e.target.value))}
				>
					<FormControlLabel
						className='priority-1'
						value={1}
						control={<Radio />}
						label='Normal'
					/>
					<FormControlLabel
						className='priority-2'
						value={2}
						control={<Radio />}
						label='Medium'
					/>
					<FormControlLabel
						className='priority-3'
						value={3}
						control={<Radio />}
						label='High'
					/>
					<FormControlLabel
						className='priority-4'
						value={4}
						control={<Radio />}
						label='Urgent'
					/>
				</RadioGroup>
			</FormControl>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id='demo-multiple-name-label'>Name</InputLabel>
				<Select
					labelId='demo-multiple-name-label'
					id='demo-multiple-name'
					multiple
					value={currentLabels}
					onChange={(e) => setCurrentLabels(e.target.value as string[])}
					input={<OutlinedInput label='Name' />}
				>
					{labels.map((label) => (
						<MenuItem key={label.name} value={label.name}>
							{label.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button type='submit' variant='contained'>
				{'Add'}
			</Button>
		</form>
	);
};

export default TaskForm;
