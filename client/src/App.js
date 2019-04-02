import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Register from './components/Register';
import LectureView from './components/LectureView';
import FetchUser from './components/FetchUser';
import { Switch, Route } from 'react-router-dom';
import { Container, } from 'semantic-ui-react';

const App = () => (
  <>
    <FetchUser>
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/lecture' component={LectureView} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
)

export default App;