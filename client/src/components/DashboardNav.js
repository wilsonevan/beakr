import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


/* /// EXAMPLE USE /////
  ITEMS_PROP____________
    The 'items' prop can take either an array where each item can be either 
    a string or object {name: "something" ,path: "/something", newTab: true} (both can be placed in the same array).
    If a string is entered, that becomes the name of the nav item, and if an
    object is entered, the name property is displayed in the nav item, and the path specifies where that
    button should link to (using <Link> from react-router-dom). The optional newTab key can be set to true if you 
    would like the link to open a new tab in the browser. 

  RIGHT_ITEMS_PROP______
    The right items are the same as normal items, but they display from the ride side of the bar

  COMPONENT_PROPS_______
    Once you have specified the name of a nav item in the items prop, a new prop can be declared
    that is the same name as that item, and it takes a component which will be rendered in the
    dashboard once that navbar item is clicked.
    ex) items={['calendar']}
        calendar={<Calendar />}

  HANDLE_SELECTED_PROP__
    the 'handleSelected' prop takes a function which is passed the 'selected' item from the dashboard nav.
    This lets you hoist the selected state into the parent component so the name of the selected nav item 
    can be used elsewhere (heading, for example)
    ex) 
        handleSelected = (selected => {
          this.setState({ selected });   <---- function in parent sets state to selected item
        })
        ... in render method....
        <DashboardNav 
          items={['courses', 'calendar']}
          courses={<CoursesIndex />}
          calendar={<Calendar />}
          handleSelected={this.handleSelected} <---- function gets passed here
        />

  BASIC_USAGE/EXAMPLE_______________

  <DashboardNav 
    items={['courses', 'calendar', 'todo', 'grades',]}
    rightItems={[{ name: 'profile', path: "/profile"},]}
    courses={<CoursesIndex />}
    calendar={<Calendar />}
    todo={<p>We still have to add todos, they are todo</p>}
    grades={<p>We still have to add grades</p>}
  />

*//////////////////////



class Dashboard extends React.Component {
  state = { selected: localStorage.getItem('previous') };

  setSelected = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    const { items, rightItems, handleSelected } = this.props;
    return (
      <DashboardContainer>
          <DashboardNav
            selected={selected}
            setSelected={this.setSelected}
            items={items}
            rightItems={rightItems}
            handleSelected={handleSelected ? handleSelected : null}
          />
          <SelectedContainer>
            { this.props[selected] }
          </SelectedContainer>
      </DashboardContainer>
    );
  }
}

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: white;
    min-height: 25vh;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

const SelectedContainer = styled.div`
  padding: 1rem;
`



class DashboardNav extends React.Component {
    highlightIf = itemName => {
      if (this.props.selected !== itemName) return null;
      return { backgroundColor: "rgba(0,0,0,0.1)" };
    };
  
    handleClick = selected => {
      localStorage.setItem('previous', selected) 
      this.props.setSelected(selected);
      if(this.props.handleSelected) {
        this.props.handleSelected(selected)
      }
    };

    renderNavItems = () => {
       return this.props.items.map((item, index) => {
           if( typeof item === "string")
            return ( 
                <NavItem
                    key={index}
                    style={this.highlightIf(item)}
                    onClick={() => this.handleClick(item)}    
                >
                    { item.charAt(0).toUpperCase() + item.slice(1, item.length) }
                </NavItem>
            )
            else return (
                <Link to={item.path} key={index} target={item.newTab? "blank" : null} >
                    <NavItem
                    >
                    { item.name.charAt(0).toUpperCase() + item.name.slice(1, item.length) }
                    </NavItem>
                </Link>
            )
       })
    }

    renderRightNavItems = () => {
       return this.props.rightItems.map((item, index) => {
           if( typeof item === "string")
            return ( 
                <NavItem
                    key={index}
                    style={this.highlightIf(item)}
                    onClick={() => this.handleClick(item)}    
                >
                    { item.charAt(0).toUpperCase() + item.slice(1, item.length) }
                </NavItem>
            )
            else return (
                <Link to={item.path} key={index} target={item.newTab? "blank" : null} >
                    <NavItem
                    >
                    { item.name.charAt(0).toUpperCase() + item.name.slice(1, item.name.length) }
                    </NavItem>
                </Link>
            )
       })
    }
  
    render() {
      return (
        <NavContainer>
          <div className="left-items">
            { this.renderNavItems() }
          </div>
          <div className="right-items">
            { this.props.rightItems && this.renderRightNavItems() }
          </div>
        </NavContainer>
      );
    }
  }
  
  const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #23a24d;
    // overflow: hidden;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `;
  
  const NavItem = styled.button`
    heght: 100%;
    background-color: transparent;
    border: none;
    color: white;
    padding: 1rem 2rem;
    font-family: "Poppins";
    font-size: 1.3rem;
    letter-spacing: 2.5px;
    cursor: pointer;
    transition-duration: 0.1s;
    outline: none;
  
    :hover {
      background-color: #41c36c;
    }
  
    :active {
      color: #23a24d;
      background-color: white;
    }
  `;

export default Dashboard;