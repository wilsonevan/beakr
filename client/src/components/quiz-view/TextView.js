import React from "react";
import styled from "styled-components";
import ReactQuill from 'react-quill';

const TextView = ({ question, currentQuestion }) => {

    const createMarkup = (html) => {
        return { __html: html };
      };

    return (
        <>
            <QuestionBody>{ question.body }</QuestionBody>
            <SubmittedText
                dangerouslySetInnerHTML=
                {createMarkup(question.submitted_text)}
                style={{padding: '15px'}}
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

const SubmittedText = styled.div`
    border: 1px solid grey;
    border-radius: 10px;
    min-height: 20rem;
`

export default TextView;