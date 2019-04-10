import React from "react";
import { Menu, Segment, Header } from "semantic-ui-react";
import axios from "axios";
import AddCourse from "../admin/AddCourse";
import AddUser from "../admin/AddUser";
import { ButtonGreen } from "../../styles/Components";
import { Link } from "react-router-dom";
import NewEnrollment from "../admin/NewEnrollment";
import styled from 'styled-components';

class AdminDashboard extends React.Component {
  state = {
    name: "",
    activeItem: "courses",
    userCourses: [],
    users: [],
    allCourses: [],
    toggleNewCourse: false,
    toggleNewUser: false
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  toggleNewCourse = () =>
    this.setState({ toggleNewCourse: !this.state.toggleNewCourse });

  resetCourseList = () => {
    axios.get(`/api/courses`).then(res => {
      this.setState({ allCourses: res.data });
    });
  };

  toggleNewUser = () =>
    this.setState({ toggleNewUser: !this.state.toggleNewUser });

  resetUserList = () => {
    axios.get(`/api/users`).then(res => {
      this.setState({ users: res.data });
    });
  };

  renderItems = () => {
    switch (this.state.activeItem) {
      case "courses":
        return (
          <>
            {this.state.toggleNewCourse ? (
              <AddCourse
                toggleNewCourse={this.toggleNewCourse}
                resetCourseList={this.resetCourseList}
              />
            ) : (
              <>
                {this.state.allCourses.map(course => {
                  return (
                    <Link to={`/courses/${course.id}`} key={course.id} >
                      <CourseOptions>
                        <h3>{course.title} `(admin)`</h3>
                      </CourseOptions>
                    </Link>
                  );
                })}
                <ButtonGreen onClick={this.toggleNewCourse} style={{marginTop: '5px'}}>
                  Add Course
                </ButtonGreen>
              </>
            )}
          </>
        );
      case "calendar":
        return <p>you are an admin fro calendar</p>;
      case "grade":
        return <p>you are an admin for grades</p>;
      case "users":
        return (
          <>
            {this.state.toggleNewUser ? (
              <AddUser
                toggleNewUser={this.toggleNewUser}
                resetUserList={this.resetUserList}
              />
            ) : (
              <>
                {this.state.users.map(user => {
                  return (
                    <div key={user.id}>
                      {user.first_name} {user.last_name}
                    </div>
                  );
                })}
                <ButtonGreen onClick={this.toggleNewUser}>Add User</ButtonGreen>
              </>
            )}
          </>
        );
      case "enrollments":
        return <NewEnrollment />;
      default:
        return <p>You are currently not enrolled in any courses</p>;
    }
  };

  componentDidMount() {
    axios.get(`/api/user_courses`).then(res => {
      this.setState({ userCourses: res.data });
    });
    axios.get(`/api/users`).then(res => {
      this.setState({ users: res.data });
    });
    axios.get(`/api/courses`).then(res => {
      this.setState({ allCourses: res.data });
    });
  }

  renderUserMenu = () => {
    const {
      auth: { user }
    } = this.props;
    const { activeItem } = this.state;

    return (
      <Segment basic>
        <Header as="h1">Welcome {user.first_name}</Header>
        <Menu attached="top" tabular inverted color="green">
          <Menu.Item
            name="courses"
            active={activeItem === "courses"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="enrollments"
            active={activeItem === "enrollments"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="calendar"
            active={activeItem === "calendar"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="grade"
            active={activeItem === "grade"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Link to="/profile">
              <Menu.Item>Profile</Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom">{this.renderItems()}</Segment>
      </Segment>
    );
  };

  render() {
    return <>{this.renderUserMenu()}</>;
  }
}

const CourseOptions = styled.div`
  margin-bottom: 10px;
  margin-left: 2px;
  color: #23a24d

  :hover {
    color: #41c36c
  }
  
`

export default AdminDashboard
