import React from 'react';
import { ButtonGreen, ButtonBlue } from '../../../styles/Components';
import styled from 'styled-components';

class QuizChoices extends React.Component {
  state = {choices: [], correctCount: 0, choiceValues: {option: 1, text: '', correct: false}}

  handleChange = (e) => {
    const { correct,} = this.state.choiceValues
    const { name, value } = e.target
    this.setState({choiceValues: { [name]: value, correct } })
  }

  toggleCorrect = (e) => {
    const{ text, } = this.state.choiceValues
    this.setState({choiceValues: {text, checked: !this.state.choiceValues.checked}, } )
  }


  handleAdd = () => {
    const choice = [...this.props.choices, this.state.choiceValues]
    this.props.setChoicesState(choice)
    this.setState({choices: choice})
    this.props.toggleChoiceForm()
  }


  

  render(){
    const { choiceValues: {text, correct}, } = this.state
    return(
      <>
      <UnitNameInput
        style={{borderRadius: '4px'}} 
        autoFocus
        required
        name='text'
        value={text}
        placeholder='Choice'
        onChange={this.handleChange}
      />
        <ButtonAdd onClick={() => this.handleAdd()}>Confirm</ButtonAdd>
      </>
    )
  }
}

const ButtonAdd = styled.div`
  display: flex
  align-items: center;
  justify-content: center;
  background: #23a24d;
  color: white;
  border: 1px solid white;
  padding: 3px;
  box-shadow: 1px 1px 2px #ededed;
  border-radius: 5px;
  margin-top: 10px;
  max-width: 150px;

  :hover {
    background: white;
    color: #23a24d;
    border: 1px solid #23a24d;
    cursor: pointer;
  }
`

const UnitNameInput = styled.textarea`
  width: 90%;
  background-color: white;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1.5rem;
  border: 2px solid #ededed;
  color: grey;

  :focus {
    box-shadow: 0 0 0 2px #23a24d;
  }
`

export default QuizChoices
