import React, { useState, useEffect } from "react";
import { AuthConsumer } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.svg";
import "./Navbar.css";
import { Dropdown } from "semantic-ui-react";
import { GlobalColors, GlobalSizes } from "../styles/GlobalStyles";

const Navbar = props => {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const url = window.location.pathname;
    switch (url) {
      case "/":
        setActiveItem(1);
        break;
      case "/how-it-works":
        setActiveItem(2);
        break;
      case "/gifts":
        setActiveItem(3);
        break;
      default:
        setActiveItem(1);
        break;
    }
  }, []);

  const activateItem = MenuItem => {
    setActiveItem(MenuItem);
  };

  const isActive = MenuItem => {
    return MenuItem === activeItem ? ActiveMenuItem : null;
  };

  const centerNavItems = () => {
    return (
      <>
        <CenterMenu>
          <NavLink to="/">
            <MenuItem as={isActive(1)} onClick={() => activateItem(1)}>
              <Item>Home</Item>
            </MenuItem>
          </NavLink>
          <NavLink to="/how-it-works">
            <MenuItem as={isActive(2)} onClick={() => activateItem(2)}>
              <Item>Pricing</Item>
            </MenuItem>
          </NavLink>
        </CenterMenu>
      </>
    );
  };

  const rightNavItems = () => {
    const {
      auth: { user, handleLogout },
      history
    } = props;

    if (user) {
      return (
        <>
          <RightMenu>
            <NavLink to="/dashboard" onClick={() => activateItem(1)}>
              <MenuItem as={isActive(1)}>
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
            <NavLink to="/login" onClick={() => activateItem(3)}>
              <MenuItem as={isActive(3)}>
                <Item>Login</Item>
              </MenuItem>
            </NavLink>
            <NavLink to="/register" onClick={() => activateItem(4)}>
              <MenuItem as={isActive(4)}>
                <Item>Register</Item>
              </MenuItem>
            </NavLink>
          </RightMenu>
        </>
      );
    }
  };

  const compactNavMenu = () => {
    return (
      <>
        <CompactNavContainer>
          <Dropdown
            button
            className="icon"
            size="huge"
            direction="left"
            fluid
            icon="bars"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to="/">
                  {/* <MenuItem as={isActive(1)} onClick={() => activateItem(1)}> */}
                  <Item textColor={GlobalColors.PrimaryGrey}>Home</Item>
                  {/* </MenuItem> */}
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/how-it-works">
                  {/* <MenuItem as={isActive(2)} onClick={() => activateItem(2)}> */}
                  <Item textColor={GlobalColors.PrimaryGrey}>How It Works</Item>
                  {/* </MenuItem> */}
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/gifts">
                  {/* <MenuItem as={isActive(3)} onClick={() => activateItem(3)}> */}
                  <Item textColor={GlobalColors.PrimaryGrey}>
                    Corporate Gifts
                  </Item>
                  {/* </MenuItem> */}
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/contact">
                  {/* <MenuItem as={isActive(4)} onClick={() => activateItem(4)}> */}
                  <Item textColor={GlobalColors.PrimaryGrey}>Contact Us</Item>
                  {/* </MenuItem> */}
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                {/* <MenuItem> */}
                <SupportLink
                  href="https://audio-grenade.freshdesk.com/support/home"
                  target="_blank"
                >
                  <Item textColor={GlobalColors.PrimaryGrey}>Support</Item>
                </SupportLink>
                {/* </MenuItem> */}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <SupportLink
                  href="https://audio-grenade.mybigcommerce.com/"
                  // target="_blank"
                >
                  {/* <MenuItem> */}
                  <Item textColor={GlobalColors.PrimaryGrey}>Shop</Item>
                  {/* </MenuItem> */}
                </SupportLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </CompactNavContainer>
      </>
    );
  };

  return (
    <NavContainer>
      <NavMenu>
        <MenuItem>
          <Logo src={logo} alt="logo" className="App-logo" />
        </MenuItem>
        {compactNavMenu()}
        {/* {centerNavItems()} */}
        {rightNavItems()}
      </NavMenu>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: absolute;
  top: 0rem;
  width: 100%;
`;

const CompactNavContainer = styled.div`
  display: none;
  position: absolute;
  top: 2rem;
  right: 2rem;

  @media (max-width: ${GlobalSizes.ScreenWidth}) {
    display: inline;
  }
`;

const MenuItem = styled.div`
  float: left;
  font-size: 1.25rem;
`;

const ActiveMenuItem = styled.div`
  float: left;
  font-size: 1.25rem;
  border-bottom: #349dc4;
  border-bottom-width: thin;
  border-bottom-style: solid;
`;

const Item = styled.p`
  display: block;
  color: ${props => props.textColor || GlobalColors.PrimaryGrey};
  text-align: center;
  padding: 10px 16px 5px 16px;
  text-decoration: none;
  z-index: 1;
`;

const SupportLink = styled.a`
  :hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  height: 4rem;
  width: 4rem;
`;

const CompanyName = styled.div`
  padding-left: 1rem;
  padding-top: 0.3rem;
  color: #f2f2f2 !important;
  font-size: 1.8rem !important;
  border: none;
`;

const NavMenu = styled.div`
  list-style-type: none;
  margin-left: 6rem;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: space-between;
`;

const RightMenu = styled.div`
  position: relative;
  text-align: center;
  border-bottom: 5px !important;
  display: flex;
  justify-content: flex-end;
  padding: 2rem 2rem 1rem 0rem;

  @media (max-width: ${GlobalSizes.ScreenWidth}) {
    display: none;
  }
`;

const CenterMenu = styled.div`
  position: relative;
  text-align: center;
  border-bottom: 5px !important;
  display: flex;
  justify-content: center;
  padding: 2rem 2rem 1rem 2rem;

  @media (max-width: ${GlobalSizes.ScreenWidth}) {
    display: none;
  }
`;

const ConnectedNavbar = props => (
  <AuthConsumer>{value => <Navbar {...props} auth={value} />}</AuthConsumer>
);

export default ConnectedNavbar;
