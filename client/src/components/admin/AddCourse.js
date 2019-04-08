import React from 'react';
import axios from 'axios';
import { Form, Header, } from 'semantic-ui-react';
import { ButtonGreen, } from '../../styles/Components';

class AddCourse extends React.Component {
  state = { title: '' }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const course = this.state
    axios.post('/api/courses', course)
      .then( res => {
        this.props.toggleNewCourse()
        this.props.resetCourseList()
      })
      .catch (res => {
        console.log(res);
      })
  }

  render() {
    const {title} = this.state

    return (
      <>
        <Header style={{ color: '#23A24D' }} content='Add Course' />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Course Title'
            required
            autoFocus
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <ButtonGreen>
            Submit
          </ButtonGreen> 
        </Form>
        <br />
        <ButtonGreen onClick={this.props.toggleNewCourse}>
          Back to Course List
        </ButtonGreen> 
      </>
    )
  }
}

export default AddCourse