import { Button } from '@mui/material';
import Logo from '../../basic-components/logo/logo';
import Title from '../../basic-components/headings/primary-heading';
import './header.css';

interface HeaderProps {
	title: string;
	btnText: string;
	handleClick: () => void;
}

const Header = ({ title, btnText, handleClick }: HeaderProps) => {
	return (
		<header className='header'>
			<div className='container'>
				<div className='header_wrapper'>
					<Logo />
					<Title text={title} />
					<div className='btn'>
						<Button variant='contained' onClick={handleClick}>
							{btnText}
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
