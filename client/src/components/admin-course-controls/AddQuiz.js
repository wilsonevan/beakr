import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Header, Button } from 'semantic-ui-react';
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
        <Header style={{color: '23A24D'}} content='Add Quiz' />
        <input 
          label='Quiz Title'
          required
          autoFocus
          name='title'
          value={title}
          onChange={this.handleChange}
          placeholder='Title'
        />
        <DateTimePicker 
          label='Due Date'
          required
          value={due_date}
          disableClock
          onChange={this.handleDateChange}
        />
        <Button content='Submit' onClick={this.handleSubmit} />
      </>
    )
  }
}

export default AddQuiz