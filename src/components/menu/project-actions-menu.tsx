import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteProjectAction } from '../../saga/sagaActions';
import { useAppDispatch } from '../../store/hooks';

interface ProjectActionMenuProps {
	anchorEl: null | HTMLElement;
	setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
	id: number;
	setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
	setIsOpenModal: React.Dispatch<
		React.SetStateAction<{
			open: boolean;
			btnText: string;
			placeholder: string;
		}>
	>;
	setIsSagaAction: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectActionMenu = ({
	anchorEl,
	setAnchorEl,
	id,
	setProjectId,
	setIsOpenModal,
	setIsSagaAction,
}: ProjectActionMenuProps) => {
	const dispatch = useAppDispatch();
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(deleteProjectAction(id));
		handleClose();
	};

	const handleEdit = () => {
		handleClose();
		setProjectId(id);
		setIsOpenModal({
			open: true,
			btnText: 'Save',
			placeholder: 'Project name',
		});
		setIsSagaAction('EDIT_PROJECT');
	};

	return (
		<>
			<div>
				<Menu
					id='basic-menu'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={handleEdit}>Edit project</MenuItem>
					<MenuItem onClick={handleDelete}>Delete</MenuItem>
				</Menu>
			</div>
		</>
	);
};

export default ProjectActionMenu;
