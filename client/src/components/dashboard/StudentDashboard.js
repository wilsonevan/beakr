import React from 'react'
import { Menu, Segment, Header } from 'semantic-ui-react'
import axios from 'axios';
import { Link, } from 'react-router-dom'
import styled from 'styled-components'
import Calendar from '../attendance/Calendar';
import StudentGradesView from '../gradebook/StudentGradesView';

class StudentDashboard extends React.Component {
  state = { name: '', activeItem: 'courses', userCourses: [],}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderItems = () => {
      switch (this.state.activeItem) {
      case 'todo':
        return (<p>Whatsup</p>)
      case 'courses':
        return this.state.userCourses.map( course => {
          return (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <CourseOptions>
                <h3>{course.title}</h3>
              </CourseOptions>
            </Link>
          )
        })
      case 'calendar':
        return (<Calendar />)
      case 'grade':
        return (<StudentGradesView />)
      default:
        return (<p>This is a list of your courses</p>)
    }
  } 


  componentDidMount(){
    axios.get(`/api/user_courses`)
    .then(res => {
      this.setState({ userCourses: res.data });
    })
  }

  renderUserMenu = () => {
    const { auth: {user}, } = this.props
    const { activeItem } = this.state

    return(
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
            <Menu.Menu position='right'>
              <Link to='/profile'>
                <Menu.Item>
                  Profile
                </Menu.Item>
              </Link>
            </Menu.Menu>
          </Menu>

        <Segment attached='bottom'>
          {this.renderItems()}
        </Segment>

      </Segment>
    )

}


render() {
  
  return (
      <>
        {this.renderUserMenu() }
      </>
    )
  }
}

const CourseOptions = styled.div`
  color: #23a24d

  :hover {
    color: #41c36c
  }
  
`

export default StudentDashboard