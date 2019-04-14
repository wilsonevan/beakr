import React from 'react';
import { AuthConsumer, } from '../providers/AuthProvider';
import { NavLink, } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import './Navbar.css'
import { Button, Icon, Sidebar, Menu, } from 'semantic-ui-react'

class Navbar extends React.Component {

	state = { activeItem: 0, visible: false, }

	activateItem = (MenuItem) => {
			this.setState( { activeItem: MenuItem, } )
	}

	isActive(MenuItem){
	return ( (MenuItem===this.state.activeItem) ? ActiveMenuItem : null);
	}

	handleMenuToggle = () => this.setState({ visible: !this.state.visible })
	handleSidebarHide = () => this.setState({ visible: false })
	
	rightNavItems = () => {
		const { auth: { user, handleLogout, }, history } = this.props;
		
		if (user) {
			const { visible } = this.state
				return(
					<>
						<div className='expanded'>
							<RightMenu>
								{/* <Dropdown>
									<Item>Courses</Item>
									<DropdownItem>
										<p>Test</p>
									</DropdownItem>
								</Dropdown> */}
								<NavLink 
									to='/dashboard' 
									onClick={() => this.activateItem(1)}
								>
									<MenuItem as={this.isActive(1)} >
										<Item>Dashboard</Item>
									</MenuItem>
								</NavLink>
								<NavLink to='/login' onClick={() => handleLogout( history )}>
									<MenuItem>
										<Item>Logout</Item>
									</MenuItem>
								</NavLink>
							</RightMenu>
						</div>

						<div className='compact'>
							<RightMenu>
								<Item>
									<Button compact icon onClick={this.handleMenuToggle}>
										<Icon name='bars' />
									</Button>
								</Item>
							</RightMenu>
							<Sidebar
								as={Menu}
								animation='overlay'
								icon='labeled'
								inverted
								onHide={this.handleSidebarHide}
								vertical
								visible={visible}
								width='thin'
								direction='right'
							>
								<NavLink
									to='/dashboard' 
									onClick={() => this.activateItem(1)}
								>
									<Menu.Item>
										Dashboard
									</Menu.Item>
								</NavLink>
								<NavLink to='/login' onClick={() => handleLogout( history )}>
									<Menu.Item>
										Logout
									</Menu.Item>
								</NavLink>
							</Sidebar>
						</div>
					</>
				)
		} else {    
			return(
				<>
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
				</>
			)
		}
	}

	render() {
		const { visible } = this.state

		return(
			<>
				<Sidebar.Pushable>
					<NavMenu borderless>
						<NavLink to='/dashboard' onClick={() => this.activateItem(0)}>
							<MenuItem>
								<Logo
									src={logo}
									alt="logo"
									className='App-logo'
								/>
							</MenuItem>
						</NavLink>
						{this.rightNavItems()}
					</NavMenu>
					<Sidebar.Pusher dimmed={visible}>
							{this.props.children}
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</>
		)
	}
}

const MenuItem = styled.li`
	float: left;
	font-size: 1.25rem;
	`;
	
const ActiveMenuItem = styled.li`
	float: left;
	font-size: 1.25rem;
	// border-bottom: #23a24d;
	// border-bottom-width: thin;
	// border-bottom-style: solid;
`;

const Item = styled.p`
	display: block;
	color: #455A64;
	text-align: center;
	padding: 10px 16px 5px 16px;
	text-decoration: none;
	z-index: 1;
`;

const Logo = styled.img`
	position: absolute;
	top: 1.5rem;
	left: 2rem;
	height: 4rem;
	width: 4rem;
`

const NavMenu = styled.ul`
	list-style-type: none;
	overflow: hidden;
`;

const RightMenu = styled.div`
	position: relative;
  	text-align: center;
	border-bottom: 5px !important;
	display: flex;
	justify-content: flex-end;
	padding: 2rem 2rem 1rem 2rem;
`;

// const Dropdown = styled.div`
// 	position: relative;
// 	display: inline-block;
// 	// :hover{display: block;}
// 	z-index: 1;
// `

// const DropdownItem = styled.div`
// 	display: none;
// 	position: absolute;
// 	background-color: #f9f9f9;
// 	min-width: 100px;
// 	// box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
// 	padding: 12px 16px;
// 	z-index: 1;
// 	border: 1px solid green;

// 	${Dropdown}:hover & {
// 		display: block;
// 	}
// `



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