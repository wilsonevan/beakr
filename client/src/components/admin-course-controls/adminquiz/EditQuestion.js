import React from 'react'

class EditQuestion extends React.Component {
  state = { ...this.props.question, }


  render() {
    const { kind, body, points_possible, choices, } = this.state
    return(
      <>
        <h3>This will be an edit form</h3>
        <h3>Question {this.props.index + 1}</h3>
          <h4 style={{margin: 0}}>Type: {kind}</h4>
          <h4 style={{margin: 0}}>Points: {points_possible}</h4>
          <h4 style={{margin: 0}}>Question: {body}</h4>
          {choices.map( (choice, index) => 
            <h5 style={{margin: 0}} key={index}>
              Q{index+1}: {choice.text}
            </h5>
          )}
      </>
    )
  }
}



export default EditQuestion