import React from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';

const TextQuestion = ({ question, currentQuestion, handleTextChange }) => {

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <ReactQuill 
                name='body'
                value={question.submitted_text}
                modules={modules}
                formats={formats}
                onChange={(value) => handleTextChange(value, currentQuestion)} 
                style={{height: '25rem', paddingBottom: '4rem'}}
            />
        </>
    )
}

const QuestionBody = styled.h3`
    margin: 2rem 0;
`

const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
       [{'color': []}, {'background': []}],
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

export default TextQuestion;