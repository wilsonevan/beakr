import React from 'react';
import ReactQuill from 'react-quill';
import { Form, } from 'semantic-ui-react';
import { ButtonGreen, } from '../../styles/Components';
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
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const content = {...this.state}
    axios.post('/api/contents', content)
      .then( res => {
        this.setState({ title: '', body: '' })
      })
  }

  render() {
    const { title, body } = this.state

    return(
      <>
        <Form 
          onSubmit={this.handleSubmit}
          style={{height: '35rem'}}
        >
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
            modules={modules}
            formats={formats}
            onChange={this.handleQuillChange} 
            style={{height: '25rem', paddingBottom: '4rem'}}
          />
          <ButtonGreen>
            Submit
          </ButtonGreen>
        </Form>
      </>
    )
  }
}

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['color', 'background'],
    ['link', 'code-block', 'image', 'video'],
    ['clean']
  ]
}
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background',
  'list', 'bullet', 'indent',
  'link', 'code-block', 'image', 'video'
]

export default AddContent