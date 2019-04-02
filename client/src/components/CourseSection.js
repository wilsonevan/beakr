import React from "react";
import Units from "./Units";

class CourseSection extends React.Component {
  state = {
    opened: false,
    units: [
      {
        name: "Arrays",
        contents: ["Ruby Arrays"],
        quizzes: [""],
        assignments: [""]
      },
      {
        name: "Hashes",
        contents: ["Ruby Hashes"],
        quizzes: [""],
        assignments: [""]
      },
      {
        name: "Methods",
        contents: ["Ruby Methods"],
        quizzes: [""],
        assignments: [""]
      }
    ]
  };

  handleClick = event => {
    this.setState({ opened: !this.state.opened });
  };

  render() {
    const { name } = this.props;

    if (this.state.opened) {
      return (
        <>
          <div className="section-opened" onClick={this.handleClick}>
            {" "}
            {name} <div className="section-icon">-</div>{" "}
          </div>
          <Units units={this.state.units} />
        </>
      );
    } else {
      return (
        <>
          <div className="section" onClick={this.handleClick}>
            {" "}
            {name} <div className="section-icon">+</div>{" "}
          </div>
        </>
      );
    }
  }
}

export default CourseSection;
