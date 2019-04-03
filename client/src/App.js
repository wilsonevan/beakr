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
import CourseWork from "./components/CourseWork";

const App = () => (
  <>
    <FetchUser>
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
    </FetchUser>
  </>
)

export default App;