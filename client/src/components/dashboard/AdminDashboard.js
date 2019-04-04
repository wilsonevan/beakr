import React from 'react'
import { Menu, Segment, Header } from 'semantic-ui-react'
import axios from 'axios';
import { ButtonGreen } from '../../styles/Components';
import { Link, } from 'react-router-dom'

class AdminDashboard extends React.Component {
  state = { name: '', activeItem: 'courses', userCourses: [], users: [], allCourses: []}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderItems = () => {   
    switch (this.state.activeItem) {
      case 'todo':
        return (<p>You are an admin</p>)
      case 'courses':
        return (
          <>
            {this.state.allCourses.map( course => {
              return (
                <Link to={`/courses/${course.id}`} key={course.id} >
                  <Header>{course.title} `(admin)`</Header>
                </Link>
              )
            })}
            <Link to={'/courses/new'}>
              <ButtonGreen>
                Add Course
              </ButtonGreen>
            </Link>
          </>         
        )
      case 'calendar':
        return (<p>you are an admin fro calendar</p>)
      case 'grade':
        return (<p>you are an admin for grades</p>)
      case 'attendance':
        return (<p>You are an admin for attendance</p>)
      case 'users':
        return (
          <>
          {this.state.users.map( user => {
            return (
            <div key={user.id}>
             {user.first_name} {user.last_name}
            </div>
            )
          })}
            <Link to={'/users/new'}>
              <ButtonGreen>
                Add User
              </ButtonGreen>
            </Link>
          </>
        )
      default:
        return (<p>You are currently not enrolled in any courses</p>)
    }
  }


  componentDidMount(){
    axios.get(`/api/user_courses`)
    .then(res => {
      this.setState({ userCourses: res.data });
    })
    axios.get(`/api/users`)
      .then(res => {
        this.setState({ users: res.data })
      })
    axios.get(`/api/courses`)
      .then(res => {
        this.setState({ allCourses: res.data })
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
            <Menu.Item
              name='attendance'
              active={activeItem === 'attendance'}
              onClick={this.handleItemClick}
              />
            <Menu.Item
              name='users'
              active={activeItem === 'users'}
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

export default AdminDashboard