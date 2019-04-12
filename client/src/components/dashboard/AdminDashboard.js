import React from "react";
import { Menu, Segment, Header } from "semantic-ui-react";
import axios from "axios";
import AddCourse from "../admin/AddCourse";
import AddUser from "../admin/AddUser";
import AddUnitMaterial from "../admin-course-controls/AddUnitMaterial";
import { Link } from "react-router-dom";
import NewEnrollment from "../admin/NewEnrollment";
import CoursesIndex from "../admin/CourseIndex";
import UserIndex from "../admin/UserIndex";
import styled from 'styled-components';
import { ButtonGreen } from '../../styles/Components';
import DashboardNav from "../DashboardNav";


class AdminDashboard extends React.Component {
  render() {
    return (
      <DashboardNav 
        items={["courses", "users", "enrollments", "materials"]}
        rightItems={[{name: "profile", path: "/profile"}]}
        courses={<CoursesIndex />}
        users={<UserIndex />}
        enrollments={<NewEnrollment />}
        materials={<AddUnitMaterial />}
      />
    )
  }
}


// class AdminDashboard extends React.Component {
//   state = {
//     name: "",
//     activeItem: "courses",
//     userCourses: [],
//     users: [],
//     allCourses: [],
//     toggleNewCourse: false,
//     toggleNewUser: false
//   };

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

//   toggleNewCourse = () =>
//     this.setState({ toggleNewCourse: !this.state.toggleNewCourse });

//   resetCourseList = () => {
//     axios.get(`/api/courses`).then(res => {
//       this.setState({ allCourses: res.data });
//     });
//   };

//   toggleNewUser = () =>
//     this.setState({ toggleNewUser: !this.state.toggleNewUser });

//   resetUserList = () => {
//     axios.get(`/api/users`).then(res => {
//       this.setState({ users: res.data });
//     });
//   };

//   renderItems = () => {
//     switch (this.state.activeItem) {
//       case "courses":
//         return (
//           <>
//             {this.state.toggleNewCourse 
//             ? (
//               <AddCourse
//                 toggleNewCourse={this.toggleNewCourse}
//                 resetCourseList={this.resetCourseList}
//               />
//               ) 
//             : 
//               (
//               <>
//                 <ListHeader>
//                   All Courses
//                   <ButtonGreen 
//                     onClick={this.toggleNewCourse} 
//                     style={{margin: "0 1rem"}}>
//                     Add Course
//                   </ButtonGreen>
//                 </ListHeader>
//                 <CoursesIndex />
//               </>
//             )}
//           </>         
//         )
//       case 'users':
//         return (
//           <>
//             {this.state.toggleNewUser ? (
//               <AddUser
//                 toggleNewUser={this.toggleNewUser}
//                 resetUserList={this.resetUserList}
//               />
//             ) : (
//               <>
//                 <ListHeader>
//                   All Users
//                   <ButtonGreen 
//                     onClick={this.toggleNewUser}
//                     style={{margin: "0 1rem"}}>
//                     Add User
//                   </ButtonGreen>
//                 </ListHeader>
//                 <UserIndex />
//               </>
//             )}
//           </>
//         );
//       case "enrollments":
//         return <NewEnrollment />;
//       case "materials":
//         return <AddUnitMaterial />;
//       default:
//         return <p>You are currently not enrolled in any courses</p>;
//     }
//   };

//   componentDidMount() {
//     axios.get(`/api/user_courses`).then(res => {
//       this.setState({ userCourses: res.data });
//     });
//     axios.get(`/api/users`).then(res => {
//       this.setState({ users: res.data });
//     });
//     axios.get(`/api/courses`).then(res => {
//       this.setState({ allCourses: res.data });
//     });
//   }

//   renderUserMenu = () => {
//     const {
//       auth: { user }
//     } = this.props;
//     const { activeItem } = this.state;

//     return (
//       <Segment basic>
//         <Header as="h1">Welcome {user.first_name}</Header>
//         <Menu attached="top" tabular inverted color="green">
//           <Menu.Item
//             name="courses"
//             active={activeItem === "courses"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="users"
//             active={activeItem === "users"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="enrollments"
//             active={activeItem === "enrollments"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name="materials"
//             active={activeItem === "materials"}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Menu position="right">
//             <Link to="/profile">
//               <Menu.Item>Profile</Menu.Item>
//             </Link>
//           </Menu.Menu>
//         </Menu>

//         <Segment attached="bottom">{this.renderItems()}</Segment>
//       </Segment>
//     );
//   };

//   render() {
//     return <>{this.renderUserMenu()}</>;
//   }
// }

const ListHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-family: "Poppins";
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 2px;
`

export default AdminDashboard
