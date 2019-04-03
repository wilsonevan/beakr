import React from "react";
import axios from "axios";
import Unit from "./Unit";

class CourseSection extends React.Component {
  state = {
    opened: false,
    units: []
  };

  componentDidMount = () => {
    axios
      .get(`/api/sections/${this.props.section.id}/units`)
      .then(res => {
        ///// Here we add quizzes and assignments just to have filler data
        ///// Delete this when those models actually exist
        const units = res.data.map(unit => {
          unit.quizzes = [""];
          unit.assignments = [""];
          return unit;
        });
        this.setState({ units });
      })
      .catch(err => console.log(err));
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
            <div className="section-title">{title}</div>
            <div className="section-icon">-</div>
          </div>
          <div className="units-container">{this.renderUnits()}</div>
        </>
      );
    } else {
      return (
        <>
          <div className="section" onClick={this.handleClick}>
            <div className="section-title">{title}</div>
            <div className="section-icon">+</div>
          </div>
        </>
      );
    }
  }
}

export default CourseSection;
