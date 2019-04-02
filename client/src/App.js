import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import LectureView from './components/LectureView';
import FetchUser from './components/FetchUser';
import { Switch, Route } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import CourseWork from "./components/CourseWork";

const App = () => (
  <>
    <FetchUser>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
<<<<<<< HEAD
          <Route exact path='/lecture' component={LectureView} />
=======
          <Route exact path='/coursework' component={CourseWork} />
>>>>>>> a1cad708338d838747e5d7e73c3ad84cf3f9aca7
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
)

export default App;