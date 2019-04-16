import React from 'react';
import { ButtonGreen } from '../../../styles/Components';

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
  }
  

  render(){
    const { choiceValues: {text, correct}, } = this.state
    return(
      <>
      <input 
        required
        name='text'
        value={text}
        placeholder='Question'
        onChange={this.handleChange}
      />
        <ButtonGreen onClick={() => this.handleAdd()}>Add To Choices</ButtonGreen>
      </>
    )
  }
}

export default QuizChoices
