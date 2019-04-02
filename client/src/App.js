import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import { Switch, Route } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import CourseWork from "./components/CourseWork";
import styled from 'styled-components';

const App = () => (
  <>
    <FetchUser>
      <Navbar>     
        <Container as={AppContainer}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/coursework' component={CourseWork} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </Navbar>
    </FetchUser>
  </>
)

// This styling allows any App view and the Sidebar to fill up the entire page height
const AppContainer = styled.div`
  height: 100vh;
`

export default App;