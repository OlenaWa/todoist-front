import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ModalState } from '../../types';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface ProjectFormModalWindowProps {
	modalState: ModalState;
	setIsOpen: React.Dispatch<React.SetStateAction<ModalState>>;
	children: React.ReactNode;
}

export default function ProjectFormModalWindow({
	modalState,
	setIsOpen,
	children,
}: ProjectFormModalWindowProps) {
	const handleClose = () => setIsOpen({ ...modalState, open: false });

	return (
		<div>
			<Modal
				open={modalState.open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>{children}</Box>
			</Modal>
		</div>
	);
}
