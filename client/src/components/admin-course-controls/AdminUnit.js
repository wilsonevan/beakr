import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import { Link } from "react-router-dom";

class AdminUnit extends React.Component {
  state = { contents: [], opened: false, loaded: false };

  unitModelsRef = React.createRef();

  componentDidMount() {
    axios
      .get(`/api/units/${this.props.unit.id}/contents`)
      .then(res => {
        this.setState({ contents: res.data, loaded: true });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    anime.remove(this.unitModelsRef.current);
  }

  handleClick = event => {
    if (!this.state.opened && this.state.loaded) {
      this.setState({ opened: !this.state.opened }, () => {
        anime({
          targets: this.unitModelsRef.current,
          opacity: "1",
          height: `${this.state.contents.length * 1.6}rem`,
          duration: this.state.contents.length * 40,
          easing: "linear"
        });
        anime({
          targets: this.props.unitContainerRef.current,
          height: `${parseFloat(
            this.props.unitContainerRef.current.style.height
          ) +
            this.state.contents.length * 1.75}rem`,
          easing: "linear",
          duration: this.state.contents.length * 40
        });
      });
    } else {
      anime({
        targets: this.unitModelsRef.current,
        opacity: "0",
        height: 0,
        duration: this.state.contents.length * 40,
        easing: "linear"
      });
      anime({
        targets: this.props.unitContainerRef.current,
        height: `${parseFloat(
          this.props.unitContainerRef.current.style.height
        ) -
          this.state.contents.length * 1.75}rem`,
        easing: "linear",
        duration: this.state.contents.length * 45
      }).finished.then(() => this.setState({ opened: !this.state.opened }));
    }
  };

  renderContents = () => {
    return this.state.contents.map((content, index) => {
      return (
        <Link
          to={`/units/${this.props.unit.id}/contents/${content.id}`}
          key={index}
        >
          <UnitModelsItem>
            <UnitModelsIcon className="models-icon" />
            {content.title}
          </UnitModelsItem>
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
          <UnitModelsItem>
            <UnitModelsIcon className="models-icon" />
            Quiz
          </UnitModelsItem>
        </Link>
      );
    });
  };
  renderAssignments = () => {
    const { assignments } = this.props.unit;
    return assignments.map((assignment, index) => {
      return (
        <Link as={UnitModelsItem} to={`/dashboard`} key={index}>
          <UnitModelsItem>
            <UnitModelsIcon className="models-icon" />
            Assignment
          </UnitModelsItem>
        </Link>
      );
    });
  };

  render() {
    const { unit } = this.props;

    if (this.state.opened) {
      return (
        <>
          <OpenedSectionUnit onClick={this.handleClick}>
            {unit.title}
            <UnitModelsContainer ref={this.unitModelsRef}>
              {this.renderContents()}
              {/* {this.renderQuizzes()}
              {this.renderAssignments()} */}
            </UnitModelsContainer>
          </OpenedSectionUnit>
        </>
      );
    } else {
      return <SectionUnit onClick={this.handleClick}>{unit.title}</SectionUnit>;
    }
  }
}

const SectionUnit = styled.div`
  color: grey;
  position: relative;
  width: 85%;
  margin: 0 auto 1rem auto;
  font-weight: lighter;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  letter-spacing: 2px;
  font-size: 1.2rem;

  :hover {
    color: #0029ff;
  }
`;

const OpenedSectionUnit = styled.div`
  color: black;
  position: relative;
  width: 85%;
  margin: 0 auto 1rem auto;
  font-weight: lighter;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  letter-spacing: 2px;
  font-size: 1.2rem;

  :hover {
    color: #0029ff;
  }
`;

const UnitModelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  border-left: 1px solid grey;
  overflow: hidden;
  opacity: 0;
  height: 0;
`;

const UnitModelsItem = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  margin-left: 0.5rem;
  padding: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  width: calc(100% - 1.5rem);
  transition-duration: 0.1s;
  color: black;

  :hover {
    color: #23a24d;
    background-color: rgba(0, 0, 0, 0.05);
  }

  :active {
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
  }

  :first-of-type {
    padding: 0 0.25rem 0.25rem 0.25rem;
  }

  :last-of-type {
    padding: 0.25rem 0.25rem 0 0.25rem;
  }
`;

const UnitModelsIcon = styled.div`
  display: inline-block;
  height: 1rem;
  width: 1rem;
  border-radius: 100px;
  border: 3px solid #23a24d;
  margin-right: 0.5rem;
`;

export default AdminUnit;
