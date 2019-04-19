import React from "react";
import AddUnitMaterial from "../admin-course-controls/AddUnitMaterial";
import NewEnrollment from "../admin/NewEnrollment";
import CoursesIndex from "../admin/CourseIndex";
import UserIndex from "../admin/UserIndex";
import DashboardNav from "../DashboardNav";
import { Segment, Header, } from 'semantic-ui-react';
import { withAuth } from "../../providers/AuthProvider";


class AdminDashboard extends React.Component {
  render() {
    return (
      <Segment basic>
        <Header as='h1'>
          Welcome {this.props.user.first_name}
        </Header>
        <DashboardNav 
          items={["courses", "users", "enrollments", "materials"]}
          rightItems={[{name: "profile", path: "/profile"}]}
          courses={<CoursesIndex />}
          users={<UserIndex />}
          enrollments={<NewEnrollment />}
          materials={<AddUnitMaterial />}
          />
      </Segment>
    )
  }
}

export default withAuth(AdminDashboard)
