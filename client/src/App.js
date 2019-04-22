import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import React from "react";
import Home from "./components/home/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ContentView from "./components/ContentView";
import AssignmentView from "./components/AssignmentView";
import QuizView from "./components/quiz-view/QuizView";
import SubmissionView from "./components/SubmissionView";
import Profile from "./components/profile/Profile";
import FetchUser from "./components/FetchUser";
import AddUser from "./components/admin/AddUser";
import AddCourse from "./components/admin/AddCourse";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import CourseWork from "./components/course-work/CourseWork";
import AdminCourseControls from "./components/admin-course-controls/AdminCourseControls";
import AdminEditSection from "./components/admin-course-controls/AdminEditSection";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import AddUnitMaterial from "./components/admin-course-controls/AddUnitMaterial";

const App = () => (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path="/" component={Home} />
      <FetchUser>
        <Navbar />
        <Container as={AppContainer}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/courses/new" component={AddCourse} />
          <ProtectedRoute exact path="/courses/:id" component={CourseWork} />
          <AdminRoute
            exact
            path="/admin/courses/:id"
            component={AdminCourseControls}
          />
          <AdminRoute
            exact
            path="/admin/courses/:course_id/sections/:id"
            component={AdminEditSection}
          />
          <ProtectedRoute
            exact
            path="/addunitmaterial"
            component={AddUnitMaterial}
          />
          <ProtectedRoute exact path="/contents/:id" component={ContentView} />
          <ProtectedRoute
            exact
            path="/assignments/:id"
            component={AssignmentView}
          />
          <ProtectedRoute
            exact
            path="/courses/:course_id/units/:unit_id/assignments/:id"
            component={AssignmentView}
          />
          <AdminRoute
            exact
            path="/assignments/:assignment_id/submissions/:id"
            component={SubmissionView}
          />
          <ProtectedRoute
            exact
            path="/courses/:course_id/units/:unit_id/quizzes/:id"
            component={QuizView}
          />
          <ProtectedRoute exact path="/users/new" component={AddUser} />
          <Route component={NoMatch} />
        </Container>
      </FetchUser>
    </Switch>
  </>
);

// This styling allows any App view and the Sidebar to fill up the entire page height
const AppContainer = styled.div`
  height: 100vh;
`;

export default App;
