import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import React from "react";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ContentView from "./components/ContentView";
import Profile from "./components/profile/Profile";
import FetchUser from "./components/FetchUser";
import AddContent from "./components/admin-course-controls/AddContent";
import AddCourse from "./components/admin/AddCourse";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import CourseWork from "./components/course-work/CourseWork";
import AdminCourseControls from "./components/admin-course-controls/AdminCourseControls";
import AdminEditSection from "./components/admin-course-controls/AdminEditSection";
import AddUser from "./components/admin/AddUser";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";

const App = () => (
  <>
    <GlobalStyles />
    <FetchUser>
      <Navbar />
      <Container as={AppContainer}>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute
            exact
            path="/units/:unit_id/contents/:id"
            component={ContentView}
          />
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
          <ProtectedRoute exact path="/content/new" component={AddContent} />
          <ProtectedRoute exact path="/users/new" component={AddUser} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
);

// This styling allows any App view and the Sidebar to fill up the entire page height
const AppContainer = styled.div`
  height: 100vh;
`;

export default App;
