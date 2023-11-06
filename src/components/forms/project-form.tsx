import { Button, TextField } from '@mui/material';
import './forms.css';

interface ProjectFormProps {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	projectName: string;
	setProjectName: (value: string) => void;
	placeholder: string;
	btnText: string;
}

const ProjectForm = ({
	handleSubmit,
	projectName,
	setProjectName,
	placeholder,
	btnText,
}: ProjectFormProps) => {
	return (
		<form
			onSubmit={(event) => handleSubmit(event)}
			className='create-project-form'
		>
			<TextField
				id='projectName'
				label={placeholder}
				variant='outlined'
				value={projectName}
				onInput={(e) => setProjectName((e.target as HTMLInputElement).value)}
			/>
			<Button type='submit' variant='contained'>
				{btnText}
			</Button>
		</form>
	);
};

export default ProjectForm;
