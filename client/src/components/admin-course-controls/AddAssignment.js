import React from 'react';
import ReactQuill from 'react-quill';
import DateTimePicker from 'react-datetime-picker';
import { Header, Button } from 'semantic-ui-react';
import axios from 'axios';

class AddAssignment extends React.Component {
  state = {title: '', body: '', due_date: '', }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleDateChange = (value) => {
    this.setState({ due_date: value })
  }

  handleQuillChange = (value) => {
    this.setState({ body: value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const assignment = {...this.state}
    // axios call
  }

  render() {
    const { title, body, due_date } = this.state

    return (
      <>
        <Header style={{color: '#23A24D'}} content="Add Assignment" />
        <form onSubmit={this.handleSubmit}>
          <input
            label='Assignment Title'
            required
            autoFocus
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />
        </form>
          <DateTimePicker 
            label='Due Date'
            required
            value={due_date}
            disableClock
            onChange={this.handleDateChange}
          />
          <ReactQuill 
            name='body'
            value={body}
            onChange={this.handleQuillChange} 
          />
          <Button content='Submit' />
      </>
    )
  }
}

export default AddAssignment