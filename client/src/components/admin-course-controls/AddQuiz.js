import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { ButtonGreen } from '../../styles/Components';
import axios from 'axios';

class AddQuiz extends React.Component {
  state = { title: '', due_date: '', }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleDateChange = (value) => {
    this.setState({ due_date: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const quiz = {...this.state}
    axios.post('/api/quizzes', quiz)
      .then( res => {
        this.props.history.push(`/quizzes/${res.data.id}`)
      })
  }

  render() {
    const { title, due_date } = this.state

    return (
      <>
        <div>
          Quiz Title
        </div>
        <input 
          required
          autoFocus
          name='title'
          value={title}
          onChange={this.handleChange}
          placeholder='Title'
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
        <ButtonGreen onClick={this.handleSubmit}>
          Submit
        </ButtonGreen>
      </>
    )
  }
}

export default AddQuiz