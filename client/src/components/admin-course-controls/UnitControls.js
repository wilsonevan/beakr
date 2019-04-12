import React from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonGreen, ButtonBlue } from "../../styles/Components";
import SearchBar from "../SearchBar";
import AddContentLink from "./AddContentLink";
import ContentBlock from "./ContentBlock";
import AddAssignmentLink from "./AddAssignmentLink";
import AssignmentBlock from "./AssignmentBlock";
import AddQuizLink from "./AddQuizLink";
import QuizBlock from "./QuizBlock";
import EditUnitTitle from "./EditUnitTitle";
import anime from "animejs";

class UnitControls extends React.Component {

  state = { editing: false, unit: this.props.unit, contents: [], assignments: [], quizzes: [], search: "contents" };

  formRef = React.createRef();

  componentDidMount() {
    axios
      .get(`/api/units/${this.props.unit.id}/contents`)
      .then(res => {
        this.setState({ contents: res.data });
      })
      .catch(err => console.log(err));
    axios
      .get(`/api/units/${this.props.unit.id}/assignments`)
      .then(res => {
        this.setState({ assignments: res.data })
      })
      .catch(err => console.log(err));
    axios
      .get(`/api/units/${this.props.unit.id}/quizzes`)
      .then(res => {
        this.setState({ quizzes: res.data })
      })
  }

  componentWillUnmount() {
    anime.remove(this.formRef.current);
  }

  createUnitContent = content_id => {
    axios
      .post(`/api/unit_contents`, { content_id, unit_id: this.props.unit.id })
      .then(res => {
        return axios.get(`/api/units/${this.props.unit.id}/contents`);
      })
      .then(res => {
        this.setState({ contents: res.data });
      })
      .catch(err => console.log(err));
  };

  createUnitAssignment = assignment_id => {
    axios
      .post(`/api/unit_assignments`, { assignment_id, unit_id: this.props.unit.id })
      .then(res => {
        return axios.get(`/api/units/${this.props.unit.id}/assignments`);
      })
      .then(res => {
        this.setState({ assignments: res.data });
      })
      .catch(err => console.log(err));
  };

  createUnitQuiz = quiz_id => {
    axios
      .post(`/api/unit_quizzes`, { quiz_id, unit_id: this.props.unit.id})
      .then(res => {
        return axios.get(`/api/units/${this.props.unit.id}/quizzes`);
      })
      .then(res => {
        this.setState({ quizzes: res.data });
      })
      .catch(err => console.log(err));
  }

  deleteUnitContent = content_id => {
    const unit_id = this.props.unit.id;
    axios
      .delete(`/api/unit/${unit_id}/contents/${content_id}/unit_content`)
      .then(res => {
        console.log(res.data);
        const contents = this.state.contents.filter(content => {
          if (content.id !== content_id) return this.renderUnitContents;
        });
        this.setState({ contents });
      })
      .catch(err => console.log(err));
  };

  deleteUnitAssignment = assignment_id => {
    const unit_id = this.props.unit.id;
    axios
      .delete(`/api/unit/${unit_id}/assignments/${assignment_id}/unit_assignment`)
      .then(res => {
        console.log(res.data);
        const assignments = this.state.assignments.filter(assignment => {
          if (assignment.id !== assignment_id) return this.renderUnitAssignments;
        });
        this.setState({ assignments });
      })
      .catch(err => console.log(err));
  }

  deleteUnitQuiz = quiz_id => {
    const unit_id = this.props.unit.id;
    axios
    .delete(`/api/unit/${unit_id}/quizzes/${quiz_id}/unit_quiz`)
    .then(res => {
      console.log(res.data);
      const quizzes = this.state.quizzes.filter(quiz => {
        if (quiz.id !== quiz_id) return this.renderUnitQuizzes;
      });
      this.setState({ quizzes });
    })
    .catch(err => console.log(err));
  }

  AddContentLinkWithProps = () => {
    return <AddContentLink createUnitContent={this.createUnitContent} />;
  };

  AddAssignmentLinkWithProps = () => {
    return <AddAssignmentLink createUnitAssignment={this.createUnitAssignment} />;
  }

  AddQuizLinkWithProps = () => {
    return <AddQuizLink createUnitQuiz={this.createUnitQuiz} />;
  }

  toggleEditing = () => {
    if (!this.state.editing) {
      this.setState({ editing: true }, () => {
        anime
          .timeline({
            targets: this.formRef.current
          })
          .add({
            height: "36rem",
            easing: "linear",
            duration: 100
          })
          .add({
            opacity: 1,
            duration: 100
          });
      });
    } else {
      anime
        .timeline({
          targets: this.formRef.current
        })
        .add({
          height: "1.75rem",
          easing: "linear",
          duration: 200
        })
        .add({
          opacity: 0,
          duration: 375
        })
        .finished.then(() => this.setState({ editing: false }));
    }
  };

  renderUnitContents = () => {
    return this.state.contents.map((content, index) => {
      return (
        <ContentBlock
          key={content.id}
          content={content}
          unit={this.props.unit}
          index={index}
          deleteUnitContent={this.deleteUnitContent}
        />
      );
    });
  };

  renderUnitAssignments = () => {
    return this.state.assignments.map((assignment, index) => {
      return (
        <AssignmentBlock
          key={assignment.id}
          assignment={assignment}
          unit={this.props.unit}
          index={index}
          deleteUnitAssignment={this.deleteUnitAssignment}
        />
      );
    });
  };

  renderUnitQuizzes = () => {
    return this.state.quizzes.map((quiz, index) => {
      return (
        <QuizBlock
          key={quiz.id}
          quiz={quiz}
          unit={this.props.unit}
          index={index}
          deleteUnitQuiz={this.deleteUnitQuiz}
        />
      );
    });
  };

  toggleSearchBar = (e) => {
    const {value} = e.target
    this.setState({ search: value })
  }

  renderSearchBar = () => {
    const { unit } = this.props

    switch (this.state.search) {
      case "contents":
        return (
          <SearchBar
            route={`/api/contents/search/${unit.id}`}
            render={props => (
              <AddContentLink
                  {...props}
                  createUnitContent={this.createUnitContent}
                  unit={unit}
              />
            )}
            placeholder="Search Contents To Add ..."
            width="100%"
          />
        )
      case "assignments":
        return (
          <SearchBar
            route={`/api/assignments/search/${unit.id}`}
            render={props => (
              <AddAssignmentLink
                {...props}
                createUnitAssignment={this.createUnitAssignment}
                unit={unit}
              />
            )}
            placeholder="Search Assignments To Add ..."
            width="100%"
          />
        )
      case "quizzes":
        return (
          <SearchBar
            route={`/api/quizzes/search/${unit.id}`}
            render={props => (
              <AddQuizLink
                {...props}
                createUnitQuiz={this.createUnitQuiz}
                unit={unit}
              />
            )}
            placeholder="Search Quizzes To Add ..."
            width="100%"
          />
        )
      default:
        break
    }
  }


  render() {
    const { unit, updateUnit, deleteUnit } = this.props;
    if (!this.state.editing)
      return (
        <UnitText onClick={() => this.toggleEditing()}>{unit.title}</UnitText>
      );
    else
      return (
        <UnitForm onSubmit={this.handleSubmit} ref={this.formRef}>
          <FormTop>
            <div>
              <ButtonGreen
                as="a"
                href="/addunitmaterial"
                target="_blank"
                style={{ padding: "0.325rem 0.75rem" }}
              >
                Create New
              </ButtonGreen>
              <ButtonBlue
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "0.5rem"
                }}
                value='contents'
                onClick={this.toggleSearchBar}
              >
                Contents
              </ButtonBlue>
              <ButtonBlue
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "0.5rem"
                }}
                value='assignments'
                onClick={this.toggleSearchBar}
              >
                Assignments
              </ButtonBlue>
              <ButtonBlue
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "0.5rem"
                }}
                value='quizzes'
                onClick={this.toggleSearchBar}
              >
                Quizzes
              </ButtonBlue>
            </div>

            <div>
              <ButtonGreen
                onClick={() => this.toggleEditing()}
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "0.5rem"
                }}
              >
                Finished
              </ButtonGreen>
              <ButtonBlue
                style={{
                  padding: "0.5rem 0.75rem",
                  marginLeft: "0.5rem"
                }}
                onClick={() => deleteUnit(unit.id)}
              >
                Delete
              </ButtonBlue>
            </div>
          </FormTop>
          <FormBottom>
            <FormBottomLeft>

              {this.renderSearchBar()}

            </FormBottomLeft>
            <FormBottomRight>
              <ContentHeading>
                <EditUnitTitle
                  unit={unit}
                  section={this.props.section}
                  updateUnit={updateUnit}
                />
              </ContentHeading>
              {this.renderUnitContents()}
              {this.renderUnitAssignments()}
              {this.renderUnitQuizzes()}
            </FormBottomRight>
          </FormBottom>
        </UnitForm>
      );
  }
}

const UnitText = styled.p`
  color: grey;
  letter-spacing: 2px;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  width: 90%;
  margin: 0 auto;
  padding-top: 2rem;
  cursor: pointer;
  // transition-duration: 0.1s;

  :hover {
    color: #0029ff;
  }
`;

const ContentHeading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  color: white;
  background-color: #bdbdbd;
  padding-top: 0.5rem;
  text-align: center;
`;

const UnitForm = styled.div`
  height: 2rem;
  opacity: 0;
  width: 90%;
  margin: 2rem auto 0 auto;
  border: 1px solid #bdbdbd;
  border-top: none;
  border-radius: 5px;
  overflow: hidden;
  transition-duration: 0.5s;
`;

const FormTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
  min-height: 3rem;
  background-color: #bdbdbd;
  color: white;
`;

const FormBottom = styled.div`
  display: flex;
  justify-contents: center;
  align-items: flex-start;
`;

const FormBottomLeft = styled.div`
  height: 30rem;
  width: 50%;
  border-right: 1px solid #bdbdbd;
  background-color: #bdbdbd;
`;
const FormBottomRight = styled.div`
  position: relative;
  height: 30rem;
  overflow-y: scroll;
  width: 50%;
  padding: 3rem 0.5rem 0 0.5rem;
`;

export default UnitControls;
