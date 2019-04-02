import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { NavLink, } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg'
import './Navbar.css'

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
				<RightMenu>
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
					<NavLink to='/login'onClick={() => handleLogout( history )}>
						<MenuItem>
							<Item>Logout</Item>
						</MenuItem>
					</NavLink>
				</RightMenu>
			)
		} else {	
			return(
				<RightMenu>
					<NavLink to='/login' onClick={() => this.activateItem(3)}>
						<MenuItem as={this.isActive(3)}>
							<Item>Login</Item>
						</MenuItem>
					</NavLink>
					<NavLink to='/register' onClick={() => this.activateItem(4)}>
						<MenuItem as={this.isActive(4)}>
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
				<NavLink to='/' onClick={() => this.activateItem(0)}>
					<MenuItem>
						<img src={logo} className="App-logo" alt="logo"></img>
					</MenuItem>
				</NavLink>
				{this.rightNavItems()}
			</Menu>
		)
	}
}

// const styles = {
// 	activeItem: {
// 		borderBottom: '1px',
// 	},
// 	inactiveItem: {
// 		borderBottom: '0px',
// 	},
// }

const MenuItem = styled.li`
	float: left;
`;

const ActiveMenuItem = styled.li`
	float: left;
	border-bottom: #23a24d;
	border-bottom-width: thin;
	border-bottom-style: solid;
`;

const Item = styled.p`
	display: block;
	color: black;
	text-align: center;
	padding: 14px 16px 5px 16px;
	text-decoration: none;
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