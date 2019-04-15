import React from "react";
import AddUnitMaterial from "../admin-course-controls/AddUnitMaterial";
import NewEnrollment from "../admin/NewEnrollment";
import CoursesIndex from "../admin/CourseIndex";
import UserIndex from "../admin/UserIndex";
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

export default AdminDashboard
