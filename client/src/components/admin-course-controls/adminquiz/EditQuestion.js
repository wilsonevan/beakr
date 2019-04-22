import React from 'react'
import styled from 'styled-components'
import { Icon, } from 'semantic-ui-react'

class EditQuestion extends React.Component {
  state = { ...this.props.question, }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.toggleEdit()
    this.props.handleSetQuestioningState(this.props.index, this.state)
  }

  handleChange = (e) => {
    const { name, value } = e.target
    if (name === "points_possible") {
      this.setState({points_possible: parseFloat(value)})  
    }
    this.setState({ [name]: value })
  }



  render() {
    const { kind, body, points_possible, choices, } = this.state
    return(
      <>
      <form onSubmit={this.handleSubmit}>
        <h3>Question {this.props.index + 1}</h3>
          <InputHeader>Type: {kind}</InputHeader>
          <InputHeader>Points:</InputHeader>
          <EditNumberInput type='number' required name='points_possible' onChange={this.handleChange} value={points_possible} />
          <InputHeader>Question:</InputHeader>
          <BodyInput
            required
            autoFocus
            name='body'
            value={body}
            onChange={this.handleChange}
            placeholder={body}
          />
          <SmallSave>
            <Icon name='save' size='large' />
          </SmallSave>
        </form>
          
          {choices.map( (choice, index) => 
            <h5 style={{margin: 0}} key={index}>
              Q{index+1}: {choice.text}
            </h5>
          )}
          </>
          
    )
  }
}


const BodyInput = styled.input`
  width: 80%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 15px;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`
const InputHeader = styled.h4`
  margin: 0;
`
const EditNumberInput = styled.input`
  width: 80%;
  background-color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1.5rem;
  padding: 2px;
  border: 2px solid #ededed;
  color: grey;
  min-height: 15px;
  display: inline-block;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

const SmallSave = styled.button`
  width: 30px;
  border: 0px;
  outline: 0px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: grey;
  margin-left: 10px;
  
  :hover {
    color: #23a24d;
    cursor: pointer;
  }
`

export default EditQuestion