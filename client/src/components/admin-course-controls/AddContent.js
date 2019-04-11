import React from 'react';
import ReactQuill from 'react-quill';
import { Header, Form, } from 'semantic-ui-react';
import axios from 'axios';

class AddContent extends React.Component {
  state = { title: '', body: '', };

  divRef = React.createRef()

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleQuillChange = (value) => {
    this.setState({ body: value })
    console.log(this.divRef)
    this.divRef.current.focus()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const content = {...this.state}
    axios.post('/api/contents', content)
      .then( res => {
        this.props.history.push(`/contents/${res.data.id}`)
      })
  }

  render() {
    const { title, body } = this.state

    return(
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Content Title'
            required
            autoFocus
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <ReactQuill 
            name='body'
            value={body}
            onChange={this.handleQuillChange}
            style={{minHeight: "30rem"}} 
            ref={this.divRef}
          >
            <div style={{minHeight: "30rem"}}/>
          </ReactQuill>
          <Form.Button content='Submit' />
        </Form>
      </>
    )
  }
}

export default AddContent