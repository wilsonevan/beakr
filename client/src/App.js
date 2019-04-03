
import ProtectedRoute from "./components/ProtectedRoute";
import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard'
import ContentView from './components/ContentView';
import FetchUser from './components/FetchUser';
import { Switch, Route } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import CourseWork from "./components/course-work/CourseWork";
import styled from "styled-components";

const App = () => (
  <>
    <FetchUser>
<<<<<<< HEAD
      <Navbar>
        <Container as={AppContainer}>
          <Switch>
            <ProtectedRoute exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/units/:unit_id/contents/:id' component={ContentView} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/courses/:id' component={CourseWork} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Navbar>
=======
      <Navbar />
        <Container as={AppContainer}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/units/:unit_id/contents/:id' component={ContentView} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/courses/:id' component={CourseWork} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
>>>>>>> 41523a8656f738a25bc9babb4a1347dfb83dc30c
    </FetchUser>
  </>
);

// This styling allows any App view and the Sidebar to fill up the entire page height
const AppContainer = styled.div`
  height: 100vh;
`;

export default App;
