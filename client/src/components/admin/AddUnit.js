import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class AddUnit extends React.Component {
  state = { title: '' }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props
    const unit = this.state
    axios.post(`/api/sections/${id}/units`, unit)
      .then( res => {
        this.setState({ title: '' })
      })
      .catch (res => {
        console.log(res);
      })
  }

  render() {
    return (
      <>
        <Header style={{ color: '#23A24D' }} content='Add Unit' />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Unit Title'
            required
            autoFocus
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <Form.Button color='green' content='submit' /> 
        </Form>
      </>
    )
  }
}

export default AddUnit