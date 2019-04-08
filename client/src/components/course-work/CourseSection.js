import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import Unit from "./Unit";

class CourseSection extends React.Component {
  state = {
    opened: false,
    loaded: false,
    units: []
  };

  unitContainerRef = React.createRef();
  sectionRef = React.createRef();

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
        this.setState({ units, loaded: true });
      })
      .catch(err => console.log(err));
  };

  componentWillUnmount() {
    anime.remove(this.unitContainerRef.current, this.sectionRef.current);
  }

  handleClick = event => {
    if (!this.state.opened && this.state.loaded) {
      this.setState({ opened: !this.state.opened }, () => {
        anime({
          targets: this.unitContainerRef.current,
          height: `${this.state.units.length * 2.25}rem`,
          duration: `${this.state.units.length * 50}`,
          easing: "linear"
        });
        anime({
          targets: this.unitContainerRef.current,
          duration: `${this.state.units.length * 50}`,
          opacity: "1",
          easing: "linear"
        });
        anime({
          targets: this.sectionRef.current,
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          duration: `${this.state.units.length * 50}`,
          easing: "linear"
        });
      });
    } else {
      anime({
        targets: this.sectionRef.current,
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        duration: `${this.state.units.length * 50}`,
        easing: "linear"
      });
      anime({
        targets: this.unitContainerRef.current,
        height: "0",
        opacity: "0",
        duration: `${this.state.units.length * 55}`,
        easing: "linear"
      }).finished.then(() => this.setState({ opened: !this.state.opened }));
    }
  };

  renderUnits = () => {
    return this.state.units.map((unit, index) => {
      return (
        <Unit
          key={index}
          unit={unit}
          unitContainerRef={this.unitContainerRef}
        />
      );
    });
  };

  render() {
    const { title } = this.props;

    if (this.state.opened) {
      return (
        <>
          <Section
            ref={this.sectionRef}
            onClick={this.handleClick}
            style={{ marginBottom: "0.5rem" }}
          >
            <SectionTitle>{title}</SectionTitle>
            <SectionIcon>-</SectionIcon>
          </Section>
          <UnitsContainer
            ref={this.unitContainerRef}
            className="units-container"
          >
            {this.renderUnits()}
          </UnitsContainer>
        </>
      );
    } else {
      return (
        <>
          <Section ref={this.sectionRef} onClick={this.handleClick}>
            <SectionTitle>{title}</SectionTitle>
            <SectionIcon>+</SectionIcon>
          </Section>
        </>
      );
    }
  }
}

const Section = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 1.1rem;
  margin-bottom: 2rem;
  background-color: #23a24d;
  color: white;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    rgba(75, 255, 100, 0.2) 15%,
    #23a24d,
    rgba(75, 255, 100, 0.2) 85%
  );
`;

const SectionTitle = styled.div`
  letter-spacing: 3.5px;
  font-size: 1.3rem;
  width: 95%;
`;

const SectionIcon = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  right: 0.75rem;
  top: 50%;
  font-size: 1.5rem;
`;

const UnitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  overflow: hidden;
  height: 0;
  opacity: 0;
`;

export default CourseSection;
