import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Unit extends React.Component {
  state = { contents: [], opened: false };

  componentDidMount() {
    axios
      .get(`/api/units/${this.props.unit.id}/contents`)
      .then(res => {
        this.setState({ contents: res.data });
      })
      .catch(err => console.log(err));
  }

  handleClick = event => {
    this.setState({ opened: !this.state.opened });
  };

  renderContents = () => {
    return this.state.contents.map((content, index) => {
      return (
        <Link
          to={`/units/${this.props.unit.id}/contents/${content.id}`}
          className="unit-models-item opened-model-item"
          key={index}
        >
          <div className="models-icon" />
          {content.title}
        </Link>
      );
    });
  };
  renderQuizzes = () => {
    const { quizzes } = this.props.unit;
    return quizzes.map((quiz, index) => {
      return (
        <Link
          to={`/dashboard`}
          className="unit-models-item opened-model-item"
          key={index}
        >
          <div className="models-icon" />
          Quiz
        </Link>
      );
    });
  };
  renderAssignments = () => {
    const { assignments } = this.props.unit;
    return assignments.map((assignment, index) => {
      return (
        <Link
          to={`/dashboard`}
          className="unit-models-item opened-model-item"
          key={index}
        >
          <div className="models-icon" />
          Assignment
        </Link>
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
