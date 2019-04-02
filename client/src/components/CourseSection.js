import React from "react";
import Unit from "./Unit";

class CourseSection extends React.Component {
  state = {
    opened: false,
    units: [
      {
        title: "Arrays",
        contents: [{ title: "Ruby Arrays" }],
        quizzes: [""],
        assignments: [""]
      },
      {
        title: "Hashes",
        contents: [{ title: "Ruby Hashes" }],
        quizzes: [""],
        assignments: [""]
      },
      {
        title: "Methods",
        contents: [{ title: "Ruby Methods" }],
        quizzes: [""],
        assignments: [""]
      }
    ]
  };

  handleClick = event => {
    this.setState({ opened: !this.state.opened });
  };

  renderUnits = () => {
    return this.state.units.map((unit, index) => {
      return <Unit key={index} unit={unit} />;
    });
  };

  render() {
    const { title } = this.props;

    if (this.state.opened) {
      return (
        <>
          <div className="section-opened" onClick={this.handleClick}>
            {title} <div className="section-icon">-</div>
          </div>
          <div className="units-container">{this.renderUnits()}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="section" onClick={this.handleClick}>
            {title} <div className="section-icon">+</div>
          </div>
        </>
      );
    }
  }
}

export default CourseSection;
