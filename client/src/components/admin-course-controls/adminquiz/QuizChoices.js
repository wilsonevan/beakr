import React from 'react';
import styled from 'styled-components';


class QuizChoices extends React.Component {
  state = {choices: [], correctCount: 0, choiceValues: {option: (this.props.choices.length + 1), text: '', correct: false}}

  handleChange = (e) => {
    const { correct, option} = this.state.choiceValues
    const { name, value } = e.target
    this.setState({choiceValues: { [name]: value, correct, option } })
  }

  toggleCorrect = (e) => {
    const{ text, option } = this.state.choiceValues
    this.setState({choiceValues: { option, text, correct: !this.state.choiceValues.correct},} )
  }


  handleAdd = () => {
    const choice = [...this.props.choices, this.state.choiceValues]
    this.props.setChoicesState(choice)
    this.setState({choices: choice})
    this.props.toggleChoiceForm()
  }

  handleSubmit = (e) => {
    e.preventDefault(e)
    if (this.state.choiceValues.text === ''){
      alert('You must add a choice')
    } else {
      this.handleAdd()

    }
  }


  

  render(){
    const { choiceValues: {text, correct}, } = this.state
    return(
      <> 
      <Contain>
      <SeventyDiv>
      <InputHeader>
        Choice
      </InputHeader>
      <UnitNameInput
        form='choice'
        style={{borderRadius: '4px'}} 
        autoFocus
        required
        name='text'
        value={text}
        onChange={this.handleChange}
        />
      </SeventyDiv>
      <ThirtyDiv>
        <InputHeader style={{marginLeft: '5px'}}>
          Correct
        </InputHeader>
        <SepDiv>

          {correct ? <Checked onClick={this.toggleCorrect}><CheckMark /></Checked> : <Check onClick={this.toggleCorrect} />}
        </SepDiv>
      </ThirtyDiv>
      </Contain>
        <ButtonAdd style={{display: 'inline-block', marginRight: '5px'}} onClick={this.handleSubmit}>Confirm</ButtonAdd>
        </>
    )
  }
}

const Check = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 4px;
  border: 1px solid #ededed;

  :hover {
    background: #ededed;
    cursor: pointer;
  }

`
const Checked = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: center;
  width: 30px;
  border-radius: 4px;
  background: #2979ff;
  border: 1px solid #ededed;
  

  :hover {
    background: #1577ff;
    cursor: pointer;
    
  }

`
const CheckMark = styled.div`
left: 9px;
top: 5px;
width: 5px;
height: 10px;
border: solid white;
border-width: 0 3px 3px 0;
-webkit-transform: rotate(45deg);
-ms-transform: rotate(45deg);
transform: rotate(45deg);
`

const ButtonAdd = styled.div`
  display: flex
  align-items: center;
  justify-content: center;
  background: #23a24d;
  color: white;
  border: 1px solid white;
  padding: 5px;
  box-shadow: 1px 1px 2px #ededed;
  border-radius: 5px;
  margin-top: 5px;
  max-width: 150px;

  :hover {
    background: white;
    color: #23a24d;
    border: 1px solid #23a24d;
    cursor: pointer;
  }
`

const UnitNameInput = styled.textarea`
  width: 100%;
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
const InputHeader = styled.h3`
  margin-top: 4px;
  margin-bottom: 3px;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
`
const SeventyDiv = styled.div`
width: 80%;
padding: 5px;
display: inline-block;
margin: 0;
`
const ThirtyDiv = styled.div`
width: 20%;
padding: 5px;
display: inline-block;
margin: 0;
`
const SepDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
`
const Contain = styled.div`
  width: 100%
  display:flex;
  justify-content: space-between;
`

export default QuizChoices
