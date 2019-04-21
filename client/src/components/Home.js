import React from "react";
import { Header } from "semantic-ui-react";
import axios from 'axios';

class Home extends React.Component {

  
  render() {
    return (
      <>
        <Header as="h3" textAlign="center">
          Beakr
        </Header>
        {/* <Button as={Link} to='/login' content='Login' /> */}
        {/* <Button as={Link} to='/register' content='Register' /> */}
      </>
    );
  }
}

export default Home;
