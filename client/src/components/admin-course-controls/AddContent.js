import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { ButtonGreen, } from '../../styles/Components';
import axios from 'axios';
import { withAlert } from 'react-alert';

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

  SuccessAlert = (message) => this.props.alert.show( message, {
    timeout: 4000, // custom timeout just for this one alert
    type: 'success',

  })
  ErrorAlert = (message) => this.props.alert.show( message, {
    timeout: 4000, // custom timeout just for this one alert
    type: 'error',
  })


  handleSubmit = (e) => {
    e.preventDefault();
    
    const content = {...this.state}
    if ( content.title === ''){
      this.ErrorAlert('Please enter a title')
    } else if ( content.body === ''){
      this.ErrorAlert('Please Enter Content Body')
    } else {
    axios.post('/api/contents', content)
      .then( res => {
        this.SuccessAlert('Content Created Successfully')
        this.setState({ title: '', body: '' })
      })
    }
  }

  render() {
    const { title, body } = this.state

    return(
      <ContainAll>
        <ContentContainer>
          <h2>
            Content Title
          </h2>
          <BodyInput
            required
            autoFocus
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <h2>
            Content Body
          </h2>
          <ReactQuill 
            name='body'
            value={body}
            modules={modules}
            formats={formats}
            onChange={this.handleQuillChange} 
            style={{height: '25rem', paddingBottom: '4rem'}}
          />
          <ButtonGreen onClick={this.handleSubmit}>
            Add Content
          </ButtonGreen>
        </ContentContainer>
      </ContainAll>
    )
  }
}

const ContainAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
  background: #23a24d;
  padding: 1%; 
  border-radius: 5px;
`

const ContentContainer = styled.div`
  background: white;
  width: 100%;
  padding: 10px;

`

const BodyInput = styled.input`
  width: 100%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 30px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

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

export default withAlert()(AddContent)