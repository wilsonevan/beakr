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

const App = () => (
  <>
    <FetchUser>
<<<<<<< Updated upstream
      <Navbar />
      <Container>
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
=======
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
>>>>>>> Stashed changes
    </FetchUser>
  </>
)

export default App;