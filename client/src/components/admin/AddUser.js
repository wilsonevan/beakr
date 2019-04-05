import React from 'react';
import axios from 'axios';
import { Button, Form, Segment, Header, } from 'semantic-ui-react';

class AddUser extends React.Component {
  state = { email: '', password: '', password_confirmation: '', first_name: '', last_name: ''};

  handleSubmit = (e) => {
    e.preventDefault();
    const { password, password_confirmation } = this.state;
    const user = this.state;
    const { history, } = this.props;

    if (password === password_confirmation)
      axios.post('/api/auth', user)
        .then( res => {
          history.push('/dashboard');
        })
    else
      alert('Passwords Do Not Match!')
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, }); 
  }

  render() {
    const { email, password, password_confirmation, first_name, last_name, } = this.state;

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='First Name'
            required
            autoFocus
            name='first_name'
            value={first_name}
            placeholder='First Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label='Last Name'
            required
            name='last_name'
            value={last_name}
            placeholder='Last Name'
            onChange={this.handleChange}
          />
          <Form.Input
            label='Email'
            required
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            label='Password'
            required
            name='password'
            value={password}
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password Confirmation"
            required
            name='password_confirmation'
            value={password_confirmation}
            placeholder='Password Confirmation'
            type='password'
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default AddUser;