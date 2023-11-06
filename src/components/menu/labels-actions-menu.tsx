import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteLabelAction } from '../../saga/sagaActions';
import { useAppDispatch } from '../../store/hooks';
import { ModalState } from '../../types';

interface LabelActionMenuProps {
	anchorEl: Element | null;
	setAnchorEl: React.Dispatch<React.SetStateAction<Element | null>>;
	id: number;
	setProjectId: React.Dispatch<React.SetStateAction<number>>;
	setIsOpenModal: React.Dispatch<React.SetStateAction<ModalState>>;
	setIsSagaAction: React.Dispatch<React.SetStateAction<string>>;
	name: string;
}

const LabelActionMenu = ({
	anchorEl,
	setAnchorEl,
	id,
	setProjectId,
	setIsOpenModal,
	setIsSagaAction,
	name,
}: LabelActionMenuProps) => {
	const dispatch = useAppDispatch();
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(deleteLabelAction({ id: id, name: name }));
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
					<MenuItem onClick={handleEdit}>Edit label</MenuItem>
					<MenuItem onClick={handleDelete}>Delete</MenuItem>
				</Menu>
			</div>
		</>
	);
};

export default LabelActionMenu;
