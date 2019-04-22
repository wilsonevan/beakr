import React from 'react';
import axios from 'axios';
import { ButtonGreen, } from '../../styles/Components';
import { Form, Segment, Header, Checkbox } from 'semantic-ui-react';

class AddUser extends React.Component {
  state = { email: '', password: '', password_confirmation: '', first_name: '', last_name: '', admin: false};

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.password_confirmation)
      axios.post('/api/users', {user : this.state})
        .then( res => {
          this.props.toggleNewUser();
        })
    else
      alert('Passwords Do Not Match!')
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, }); 
  }

  toggleAdmin = (e) => {
    this.setState({ admin: !this.state.admin })
  }

  render() {
    const { email, password, password_confirmation, first_name, last_name, } = this.state;

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Add User</Header>
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
          <Form.Field
            control={Checkbox}
            label="Admin"
            value="admin"
            onChange={this.toggleAdmin}
          />
          <Segment textAlign='center' basic>
            <ButtonGreen>
              Submit
            </ButtonGreen>
          </Segment>
        </Form>
        <ButtonGreen onClick={this.props.toggleNewUser}>
          Back to Course List
        </ButtonGreen>
      </Segment>
    )
  }
}

export default AddUser;