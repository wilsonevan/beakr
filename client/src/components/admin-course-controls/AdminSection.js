import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import AdminUnit from "./AdminUnit";

class AdminSection extends React.Component {
  state = {
    opened: false,
    units: []
  };

  unitContainerRef = React.createRef();

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
    this.setState({ opened: !this.state.opened }, () => {
      if (!this.state.opened) return null;
      anime({
        targets: this.unitContainerRef.current,
        maxHeight: "500vh",
        duration: "5000",
        easing: "linear"
      });
      anime({
        targets: this.unitContainerRef.current,
        duration: "400",
        opacity: "1",
        easing: "linear"
      });
    });
  };

  renderUnits = () => {
    return this.state.units.map((unit, index) => {
      return <AdminUnit key={index} unit={unit} />;
    });
  };

  render() {
    const { title } = this.props;

    if (this.state.opened) {
      return (
        <>
          <SectionOpened onClick={this.handleClick}>
            <SectionTitle>{title}</SectionTitle>
            <SectionIcon>-</SectionIcon>
          </SectionOpened>
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
          <Section onClick={this.handleClick}>
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

const SectionOpened = styled.div`
  position: relative;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 1.1rem;
  margin-bottom: 0.5rem;
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
  max-height: 0;
  opacity: 0;
`;

export default AdminSection;
