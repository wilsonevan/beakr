import React from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.svg";
import "./Navbar.css";

class Navbar extends React.Component {
  state = { activeItem: 0, visible: false };

  componentDidMount() {
    const url = window.location.pathname;
    switch (url) {
      case "/dashboard":
        this.activateItem(1);
        break;
      case "/login":
        this.activateItem(3);
        break;
      case "/register":
        this.activateItem(4);
        break;
      default:
        this.activateItem(1);
        break;
    }
  }

  activateItem = MenuItem => {
    this.setState({ activeItem: MenuItem });
  };

  isActive(MenuItem) {
    return MenuItem === this.state.activeItem ? ActiveMenuItem : null;
  }

  handleMenuToggle = () => this.setState({ visible: !this.state.visible });
  handleSidebarHide = () => this.setState({ visible: false });

  rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      history
    } = this.props;

    if (user) {
      return (
        <>
          <RightMenu>
            <NavLink to="/dashboard" onClick={() => this.activateItem(1)}>
              <MenuItem as={this.isActive(1)}>
                <Item>{user.admin ? "Admin Dashboard" : "Dashboard"}</Item>
              </MenuItem>
            </NavLink>
            <NavLink to="/login" onClick={() => handleLogout(history)}>
              <MenuItem>
                <Item>Logout</Item>
              </MenuItem>
            </NavLink>
          </RightMenu>
        </>
      );
    } else {
      return (
        <>
          <RightMenu>
            <NavLink to="/login" onClick={() => this.activateItem(3)}>
              <MenuItem as={this.isActive(3)}>
                <Item>Login</Item>
              </MenuItem>
            </NavLink>
            <NavLink to="/register" onClick={() => this.activateItem(4)}>
              <MenuItem as={this.isActive(4)}>
                <Item>Register</Item>
              </MenuItem>
            </NavLink>
          </RightMenu>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <NavMenu borderless>
          <NavLink to="/">
            <MenuItem>
              <Item>
                <Logo src={logo} alt="logo" className="App-logo" />
                {window.location.pathname == "/" && (
                  <CompanyName>Beakr</CompanyName>
                )}
              </Item>
            </MenuItem>
          </NavLink>
          {this.rightNavItems()}
        </NavMenu>
      </>
    );
  }
}

const MenuItem = styled.li`
  float: left;
  font-size: 1.25rem;
`;

const ActiveMenuItem = styled.li`
  float: left;
  font-size: 1.25rem;
  border-bottom: #23a24d;
  border-bottom-width: thin;
  border-bottom-style: solid;
`;

const Item = styled.p`
  display: block;
  color: ${window.location.pathname == "/" ? "white" : "#455a64"};
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
`;

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
  margin-left: 6rem;
`;

const CompanyName = styled.h1`
  color: white !important;
  position: absolute;
  top: 0.8rem;
  left: 7rem;
  height: 4rem;
  width: 4rem;
`;

const ConnectedNavbar = props => (
  <AuthConsumer>{value => <Navbar {...props} auth={value} />}</AuthConsumer>
);

export default ConnectedNavbar;
