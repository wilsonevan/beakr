import React from "react";

class Unit extends React.Component {
  state = { opened: false };

  handleClick = event => {
    this.setState({ opened: !this.state.opened });
  };

  renderContents = () => {
    const { contents } = this.props.unit;
    return contents.map((content, index) => {
      return (
        <div className="unit-models-item opened-model-item" key={index}>
          <div className="models-icon" />
          {content.title}
        </div>
      );
    });
  };
  renderQuizzes = () => {
    const { quizzes } = this.props.unit;
    return quizzes.map((quiz, index) => {
      return (
        <div className="unit-models-item opened-model-item" key={index}>
          <div className="models-icon" />
          Quiz
        </div>
      );
    });
  };
  renderAssignments = () => {
    const { assignments } = this.props.unit;
    return assignments.map((assignment, index) => {
      return (
        <div className="unit-models-item opened-model-item" key={index}>
          <div className="models-icon" />
          Assignment
        </div>
      );
    });
  };

  render() {
    const { unit } = this.props;

    if (this.state.opened) {
      return (
        <>
          <div className="unit unit-opened" onClick={this.handleClick}>
            {unit.title}
            <div className="unit-models-container">
              {this.renderContents()}
              {this.renderQuizzes()}
              {this.renderAssignments()}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="unit" onClick={this.handleClick}>
          {unit.title}
        </div>
      );
    }
  }
}

export default Unit;
