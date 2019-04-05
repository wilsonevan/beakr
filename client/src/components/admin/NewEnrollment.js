import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class NewEnrollment extends React.Component {
  state = { users: [], user_id: '', course_id: '', role: '', }

  componentDidMount() {
    axios.get('/api/users')
      .then( res => {
        this.setState({ users: res.data })
        let users = res.data
        return users
      })
      .catch( res => {
        console.log(res)
      })

      // this.setState
  }

  handleUserChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value }) 
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  // prepOptions = (users) => {
  //   const options = users.map( user => ({
  //       key: user.id,
  //       text: `${user.first_name} ${user.last_name}`,
  //       value: user.id 
  //     })
  //   )

  //   return options
  // }

  prepOptions = (users) => {
    return (
      users.map(user => {
        return (
          <option 
            key={user.id}
            value={user.id}
            label={`${user.first_name} ${user.last_name}`}
          />
        )
      })
    )
  }

  render() {
    const { users, user_id, role } = this.state

    return (
      <>
        <Header style={{ color: '#23A24D'}} content='Enroll User' />
        <Form onSubmit={this.handleSubmit}>
          <select 
            label='Select User'
            name='user_id'
            value={user_id}
            onChange={this.handleUserChange}
            required
          >
            <option value='' disabled>Users</option>
            {this.prepOptions(users)}
          </select>

          <Form.Group inline>
            <label>Role</label>
            <Form.Radio
              label='Staff'
              value='staff'
              // checked={value === 'staff'}
              // onChange={this.handleChange}
            />
            <Form.Radio
              label='Student'
              value='student'
              // checked={value === 'student'}
              // onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button color='green' content='Submit' />
        </Form>
      </>
    )
  }
}

export default NewEnrollment