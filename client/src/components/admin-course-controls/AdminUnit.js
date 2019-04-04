import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import { Link } from "react-router-dom";

class AdminUnit extends React.Component {
  state = { contents: [], opened: false };

  unitModelsRef = React.createRef();

  componentDidMount() {
    axios
      .get(`/api/units/${this.props.unit.id}/contents`)
      .then(res => {
        this.setState({ contents: res.data });
      })
      .catch(err => console.log(err));
  }

  handleClick = event => {
    this.setState({ opened: !this.state.opened }, () => {
      if (!this.state.opened) return null;
      anime({
        targets: this.unitModelsRef.current,
        maxHeight: "200vh",
        duration: "2000",
        easing: "linear"
      });
      anime({
        targets: this.unitModelsRef.current,
        duration: "400",
        opacity: "1",
        easing: "linear"
      });
    });
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
              {this.renderQuizzes()}
              {this.renderAssignments()}
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
  flex-shrink: 100%;
  color: grey;
  position: relative;
  left: 1rem;
  margin-bottom: 1rem;
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
  flex-shrink: 100%;
  color: black;
  position: relative;
  left: 1rem;
  margin-bottom: 1rem;
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
  max-height: 0;
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
