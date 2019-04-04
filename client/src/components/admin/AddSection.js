import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';

class AddSection extends React.Component {
  state = { title: '' }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params
    const section = this.state
    axios.post(`/api/courses/${id}/sections`, section)
      .then( res => {
        this.props.history.push(`/courses/${res.data.id}`)
      })
      .catch (res => {
        console.log(res);
      })
  }

  render() {
    const { title } = this.state

    return (
      <>
        <Header style={{ color: '#23A24D' }} content='Add Section' />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Section Title'
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

export default AddSection