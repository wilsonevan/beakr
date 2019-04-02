import React from 'react'
import styled from 'styled-components'
import { Grid, Input,  Menu, Segment, Header, } from 'semantic-ui-react'
import { AuthConsumer } from '../../providers/AuthProvider';

class Dashboard extends React.Component {
  state = { name: '', activeItem: 'courses'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })



  renderItem = () => {
    switch (this.state.activeItem) {

      case 'todo':
        return (<p>Whatsup</p>)
      case 'courses':
        return (<p>This is a list of your courses</p>)
      case 'calendar':
        return (<p>your calendar will go here</p>)
      case 'grade':
        return (<p>Dont fail</p>)
      case 'attendance':
        return (<p>Dont play hooky</p>)
      default:
        return (<p>This is a list of your courses</p>)
      }
      
    }

    componentDidMount(){
      
      // this.setState({name: name})
    }


  
  render() {
    const { auth: { user, }, } = this.props;
    const { activeItem } = this.state
    return (
      <>
      <Segment basic>
          <Header as='h1'>
            Welcome {user.first_name}
          </Header>
          <Menu attached='top' tabular inverted color='green'>
            <Menu.Item 
              name='courses' 
              active={activeItem === 'courses'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item
              name='calendar'
              active={activeItem === 'calendar'}
              onClick={this.handleItemClick}
            />
            <Menu.Item 
              name='todo' 
              active={activeItem === 'todo'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item
              name='grade'
              active={activeItem === 'grade'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='attendance'
              active={activeItem === 'attendance'}
              onClick={this.handleItemClick}
            />
          </Menu>

        <Segment attached='bottom'>
          {this.renderItem()}
        </Segment>

      </Segment>
      </>
    )
  }
}

class connectDashboard extends React.Component {
render(){
return(

  <AuthConsumer>
    {auth => <Dashboard {...this.props} auth={auth}/>}
  </AuthConsumer>
  )
}
}

export default connectDashboard