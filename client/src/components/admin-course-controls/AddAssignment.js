import React from 'react';
import ReactQuill from 'react-quill';
import DateTimePicker from 'react-datetime-picker';
import { ButtonGreen } from '../../styles/Components';
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
  
  handleSubmit = () => {
    const assignment = {...this.state}
    axios.post('/api/assignments', assignment)
      .then( res => {
        this.props.history.push(`/assignments/${res.data.id}`)
      })
  }

  render() {
    const { title, body, due_date } = this.state

    return (
      <>
        <div>
          Assignment Title
        </div>
        <br />
        <input
          required
          autoFocus
          name='title'
          value={title}
          placeholder='Title'
          onChange={this.handleChange}
          style={{width: '100%'}}
        />
        <br />
        <br />
        <div>
          Due Date
        </div>
        <DateTimePicker 
          required
          value={due_date}
          disableClock
          onChange={this.handleDateChange}
        />
        <br />
        <br />
        <ReactQuill 
          name='body'
          value={body}
          onChange={this.handleQuillChange}
          style={{height: '25rem', paddingBottom: '4rem'}}
        />
        <ButtonGreen onClick={this.handleSubmit}>
          Submit
        </ ButtonGreen>
      </>
    )
  }
}

export default AddAssignment