import React from 'react';
import ReactQuill from 'react-quill';
import DateTimePicker from 'react-datetime-picker';
import { ButtonGreen } from '../../styles/Components';
import axios from 'axios';

class AddAssignment extends React.Component {
  state = {title: '', body: '', kind: '' }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleKindChange = (e) => {
    const { value } = e.target
    this.setState({ kind: value })
  }

  handleQuillChange = (value) => {
    this.setState({ body: value })
  }
  
  handleSubmit = (e) => {
    const assignment = {...this.state}
    e.preventDefault()
    axios.post('/api/assignments', assignment)
      .then( res => {
        this.setState({ title: '', body: '', kind: ''})
      })
  }

  render() {
    const { title, body, } = this.state

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
          Submission Type
        </div>
        <input
          type='radio'
          value='url'
          name='kind'
          id='kind1'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind1'
          >
            URL Submission
          </label>
        <br />
        <input
          type='radio'
          value='code'
          name='kind'
          id='kind2'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind2'
          >
            Code Submission
          </label>
        <br />
        <input
          type='radio'
          value='none'
          name='kind'
          id='kind3'
          onClick={this.handleKindChange}
          style={{marginRight: '5px'}}
        />
          <label
            for='kind3'
          >
            Text Only Submission
          </label>
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