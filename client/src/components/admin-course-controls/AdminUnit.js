import React from "react";
import axios from "axios";
import anime from "animejs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class AdminUnit extends React.Component {
  state = { contents: [], assignments: [], quizzes: [], opened: false, loaded: false };

  unitModelsRef = React.createRef();


  componentDidMount() {
    Promise.all([this.setContents(), this.setAssignments(), this.setQuizzes()])
    .then((res) => {
      let materials = [
        ...this.state.quizzes, 
        ...this.state.contents, 
        ...this.state.assignments
      ].sort((a, b) =>  a.sequence - b.sequence );
      this.setState({ materials, loaded: true });
    })
    .catch((err) => console.log(err))
  }

  setContents = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/contents/get_contents_with_attrs`)
      .then(res => {
        const contents = res.data.filter((content) => {
          if(content.visible) return true
        })
        this.setState({ contents }, () => resolve("success"));
      })
      .catch(err => reject(err));
    })
  }

  setAssignments = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/assignments/get_assignments_with_attrs`)
      .then(res => {
        const assignments = res.data.filter((assignment) => {
          if(assignment.visible) return assignment
        })
        this.setState({ assignments }, () => resolve("success"));
      })
      .catch(err => reject(err));
    })
  }

  setQuizzes = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/quizzes/get_quizzes_with_attrs`)
      .then(res => {
        const quizzes = res.data.filter((quiz) => {
          if(quiz.visible) return quiz
        })
        this.setState({ quizzes }, () => resolve("success"))
      })
      .catch(err => resolve(err));
    })
  }

  componentWillUnmount() {
    anime.remove(this.unitModelsRef.current);
  }

  handleClick = event => {
    const { materials } = this.state;

    if (!this.state.opened) {
      this.setState({ opened: !this.state.opened }, () => {
        anime({
          targets: this.unitModelsRef.current,
          opacity: "1",
          height: `${materials.length * 1.6}rem`,
          duration: materials.length * 40,
          easing: "linear"
        });
        anime({
          targets: this.props.unitContainerRef.current,
          height: `${parseFloat(
            this.props.unitContainerRef.current.style.height
          ) +
            (materials.length) * 1.75}rem`,
          easing: "linear",
          duration: materials.length * 40
        });
      });
    } else {
      anime({
        targets: this.unitModelsRef.current,
        opacity: "0",
        height: 0,
        duration: (materials.length) * 40,
        easing: "linear"
      });
      anime({
        targets: this.props.unitContainerRef.current,
        height: `${parseFloat(
          this.props.unitContainerRef.current.style.height
        ) -
          (materials.length) * 1.75}rem`,
        easing: "linear",
        duration: (materials.length) * 45
      }).finished.then(() => this.setState({ opened: !this.state.opened }));
    }
  };

  renderMaterials = () => {
    return this.state.materials.map((material, index) => {
      if(material.material === "content") return (
        <Link
          to={`/contents/${material.id}`}
          key={index}
        >
          <UnitModelsItem>
            <Icon name="file alternate outline" />
            {material.title}
          </UnitModelsItem>
        </Link>
      )
      else if (material.material === "assignment") return (
        <Link
          to={`/courses/${this.props.courseId}/units/${this.props.unit.id}/assignments/${material.id}`}
          key={index}
        >
          <UnitModelsItem>
          <Icon name="edit outline" />
            {material.title}
          </UnitModelsItem>
        </Link>
      )
      else if (material.material === "quiz") return (
        <Link 
          to={`/courses/${this.props.courseId}/units/${this.props.unit.id}/quizzes/${material.id}`} 
          key={index}
        >
          <UnitModelsItem>
            <Icon name="check" />
            {material.title}
          </UnitModelsItem>
        </Link>
      )
    })
  }

  render() {
    const { unit } = this.props;

    if (this.state.opened && this.state.loaded) {
      return (
        <>
          <OpenedSectionUnit onClick={this.handleClick}>
            {unit.title}
            <UnitModelsContainer ref={this.unitModelsRef}>
              { this.renderMaterials() }
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
  margin: 0 auto 1rem 1rem;
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
  color: black;
  position: relative;
  width: 85%;
  margin: 0 auto 1rem 1rem;
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
  alignt-items: flex-start;
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
