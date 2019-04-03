import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard'
import LectureView from './components/LectureView';
import FetchUser from './components/FetchUser';
import { Switch, Route } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import CourseWork from "./components/CourseWork";
import styled from 'styled-components';

const App = () => (
  <>
    <FetchUser>
<<<<<<< HEAD
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/units/:unit_id/contents/:id' component={LectureView} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/coursework' component={CourseWork} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
=======
      <Navbar>     
        <Container as={AppContainer}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/lecture' component={LectureView} />
            <Route exact path='/coursework' component={CourseWork} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Navbar>
>>>>>>> 537127626139b74367761d294007c9a3116731bf
    </FetchUser>
  </>
)

// This styling allows any App view and the Sidebar to fill up the entire page height
const AppContainer = styled.div`
  height: 100vh;
`

export default App;