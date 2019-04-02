import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
// import { Header, Menu, } from 'semantic-ui-react';
import { NavLink, } from 'react-router-dom';
import styled from 'styled-components';

class Navbar extends React.Component {

	state = { activeItem: 0, }

	activateItem = (MenuItem) => {
		this.setState( { activeItem: MenuItem, } )
	}

	isActive(MenuItem){
    return ( (MenuItem===this.state.activeItem) ? ActiveMenuItem : null);
	}
	
	rightNavItems = () => {
		const { auth: { user, handleLogout, }, history } = this.props;
		// const { activeItem, } = this.state;
		
		if (user) {
			return(
				<RightMenu position='right'>
					<NavLink to='/coursework' onClick={() => this.activateItem(1)}>
						<MenuItem as={this.isActive(1)}>
							<Item>Coursework</Item>
						</MenuItem>
					</NavLink>
					<NavLink to='/attendance' onClick={() => this.activateItem(2)}>
						<MenuItem as={this.isActive(2)}>
							<Item>Attendance</Item>
						</MenuItem>
					</NavLink>
					<MenuItem onClick={() => handleLogout( history )}>
						<Item>Logout</Item>
					</MenuItem>
				</RightMenu>
			)
		} else {	
			return(
				<RightMenu position='right'>
					<NavLink to='/login'>
						<MenuItem>
							<Item>Login</Item>
						</MenuItem>
					</NavLink>
					<NavLink to='/register'>
						<MenuItem>
							<Item>Register</Item>
						</MenuItem>
					</NavLink>
				</RightMenu>
			)
		}
	}

	render() {
		return(
			<Menu borderless>
				<NavLink to='/'>
					<MenuItem>
						<Item>Home</Item>
					</MenuItem>
				</NavLink>
				{this.rightNavItems()}
			</Menu>
		)
	}
}

const styles = {
	activeItem: {
		borderBottom: '2px',
	},
	inactiveItem: {
		borderBottom: '0px',
	},
}

const MenuItem = styled.li`
	float: left;
`;

const ActiveMenuItem = styled.li`
	float: left;
	border-bottom: 2px solid green;
`;

const Menu = styled.li`
	list-style-type: none;
	// margin: 10px;
	// padding: 10px;
	overflow: hidden;
`;

const RightMenu = styled.div`
  text-align: center;
	border-bottom: 5px !important;
	display: flex;
	justify-content: flex-end;
`;

const Item = styled.a`
	display: block;
	color: grey;
	text-align: center;
	padding: 14px 16px;
	text-decoration: none;
`;


const ConnectedNavbar = (props) => (
	<AuthConsumer>
		{ value => (
			<Navbar 
				{ ...props }
				auth={ value }
			/>
		)}
	</AuthConsumer>
)

export default ConnectedNavbar;