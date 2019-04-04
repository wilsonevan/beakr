import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const NoMatch = () => (
  <Header as='h3' textAlign='center'>
    Page not found
    <Button as={Link} to='/dashboard' content='Home' />
  </Header>
)

export default NoMatch;