import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class Unit extends React.Component {
  state = { contents: [], assignments: [], quizzes: [], opened: false, contentsLoaded: false, assignmentsLoaded: false, quizzesLoaded: false };

  unitModelsRef = React.createRef();

  componentDidMount() {
    axios
      .get(`/api/units/${this.props.unit.id}/contents/get_contents_with_attrs`)
      .then(res => {
        const contents = res.data.filter((content) => {
          if(content.visible) return true
        })
        this.setState({ contents });
      })
      .catch(err => console.log(err));
    axios
      .get(`/api/units/${this.props.unit.id}/assignments/get_assignments_with_attrs`)
      .then(res => {
        const assignments = res.data.filter((assignment) => {
          if(assignment.visible) return assignment
        })
        this.setState({ assignments });
      })
      .catch(err => console.log(err));
    axios
      .get(`/api/units/${this.props.unit.id}/quizzes/get_quizzes_with_attrs`)
      .then(res => {
        const quizzes = res.data.filter((quiz) => {
          if(quiz.visible) return quiz
        })
        this.setState({ quizzes });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    anime.remove(this.unitModelsRef.current);
  }

  handleClick = event => {
    const { contents, assignments, quizzes } = this.state

    if (!this.state.opened) {
      this.setState({ opened: !this.state.opened }, () => {
        anime({
          targets: this.unitModelsRef.current,
          opacity: "1",
          height: `${(contents.length + assignments.length + quizzes.length) * 1.6}rem`,
          duration: (contents.length + assignments.length + quizzes.length) * 40,
          easing: "linear"
        });
        anime({
          targets: this.props.unitContainerRef.current,
          height: `${parseFloat(
            this.props.unitContainerRef.current.style.height
          ) +
            (contents.length + assignments.length + quizzes.length) * 1.75}rem`,
          easing: "linear",
          duration: this.state.contents.length * 40
        });
      });
    } else {
      anime({
        targets: this.unitModelsRef.current,
        opacity: "0",
        height: 0,
        duration: (contents.length + assignments.length + quizzes.length) * 40,
        easing: "linear"
      });
      anime({
        targets: this.props.unitContainerRef.current,
        height: `${parseFloat(
          this.props.unitContainerRef.current.style.height
        ) -
          (contents.length + assignments.length + quizzes.length) * 1.75}rem`,
        easing: "linear",
        duration: (contents.length + assignments.length + quizzes.length) * 45
      }).finished.then(() => this.setState({ opened: !this.state.opened }));
    }
  };

  renderContents = () => {
    return this.state.contents.map((content, index) => {
      return (
        <Link
          to={`/contents/${content.id}`}
          key={index}
        >
          <UnitModelsItem>
            <Icon name="file alternate outline" />
            {content.title}
          </UnitModelsItem>
        </Link>
      );
    });
  };
  renderQuizzes = () => {
    return this.state.quizzes.map((quiz, index) => {
      return (
        <Link
          to={`/courses/${this.props.courseId}/units/${this.props.unit.id}/quizzes/${quiz.id}`}
          key={index}
        >
          <UnitModelsItem>
            <Icon name="check" />
            {quiz.title}
          </UnitModelsItem>
        </Link>
      );
    });
  };
  renderAssignments = () => {
    return this.state.assignments.map((assignment, index) => {
      return (
        <Link 
          to={`/courses/${this.props.courseId}/units/${this.props.unit.id}/assignments/${assignment.id}`} 
          key={index}
        >
          <UnitModelsItem>
            <Icon name="edit outline" />
            {assignment.title}
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
              {this.renderAssignments()}
              {this.renderQuizzes()}
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
    color: #23a24d;
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
    color: #23a24d;
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

export default Unit;
