import React from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";
import SearchBar from "../SearchBar";
import AddContentLink from "./AddContentLink";
import ContentBlock from "./ContentBlock";
import AddAssignmentLink from "./AddAssignmentLink";
import AssignmentBlock from "./AssignmentBlock";
import AddQuizLink from "./AddQuizLink";
import QuizBlock from "./QuizBlock";
import EditUnitTitle from "./EditUnitTitle";
import { Icon } from "semantic-ui-react";
import ReactSortable from "react-sortablejs";



class UnitControls extends React.Component {
  state = { 
    editing: false, 
    unit: this.props.unit, 
    contents: [], 
    assignments: [], 
    quizzes: [], 
    materials: [], 
    search: "contents" 
  };

  componentDidMount() {
    Promise.all([this.setContents(), this.setAssignments(), this.setQuizzes()])
    .then((res) => {
      let materials = [
        ...this.state.quizzes, 
        ...this.state.contents, 
        ...this.state.assignments
      ].sort((a, b) =>  a.sequence - b.sequence );
      this.setState({ materials }, () => console.log(this.state.materials));
    })
    .catch((err) => console.log(err))
  }

  setContents = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/contents/get_contents_with_attrs`)
      .then(res => {
        this.setState({ contents: res.data }, () => resolve("success"));
      })
      .catch(err => reject(err));
    })
  }

  setAssignments = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/assignments/get_assignments_with_attrs`)
      .then(res => {
        this.setState({ assignments: res.data }, () => resolve("success"));
      })
      .catch(err => resolve(err));
    })
  }

  setQuizzes = () => {
    return new Promise((resolve, reject) => {
      axios
      .get(`/api/units/${this.props.unit.id}/quizzes/get_quizzes_with_attrs`)
      .then(res => {
        this.setState({ quizzes: res.data }, () => resolve("success"))
      })
      .catch(err => resolve(err));
    })
  }

  createUnitContent = content_id => {
    axios
      .post(`/api/unit_contents`, { content_id, unit_id: this.props.unit.id })
      .then(res => {
        return axios.get(`/api/units/${this.props.unit.id}/contents/get_contents_with_attrs`);
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
        return axios.get(`/api/units/${this.props.unit.id}/assignments/get_assignments_with_attrs`);
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
        return axios.get(`/api/units/${this.props.unit.id}/quizzes/get_quizzes_with_attrs`);
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
      const quizzes = this.state.quizzes.filter(quiz => {
        if (quiz.id !== quiz_id) return this.renderUnitQuizzes;
      });
      this.setState({ quizzes });
    })
    .catch(err => console.log(err));
  }

  toggleUnitVisibility = () => {
    axios.put(
      `/api/sections/${this.props.section.id}/units/${this.state.unit.id}`, 
      {unit: {visible: !this.state.unit.visible}}
    )
    .then((res) => {
      this.setState({ unit: res.data });
    })
    .catch((err) => console.log(err));
  }

  toggleContentVisibility = (visible, id, unit_content_id) => {
    if(visible) {
      axios.put(`/api/unit_contents/${unit_content_id}`, {unit_content: { visible: false } })
      .then((res) => {
        const contents = this.state.contents.map((content) => {
          if(content.id === id) content.visible = false;
          return content;
        })
        this.setState({ contents });
      })
      .catch((err) => console.log(err));
    } else {
      axios.put(`/api/unit_contents/${unit_content_id}`, {unit_content: { visible: true } })
      .then((res) => {
        const contents = this.state.contents.map((content) => {
          if(content.id === id) content.visible = true;
          return content;
        })
        this.setState({ contents });
      })
      .catch((err) => console.log(err));
    }
  }

  toggleAssignmentVisibility = (visible, id, unit_assignment_id) => {
    if(visible) {
      axios.put(`/api/unit_assignments/${unit_assignment_id}`, {unit_assignment: { visible: false } })
      .then((res) => {
        const assignments = this.state.assignments.map((assignment) => {
          if(assignment.id === id) assignment.visible = false;
          return assignment;
        })
        this.setState({ assignments });
      })
      .catch((err) => console.log(err));
    } else {
      axios.put(`/api/unit_assignments/${unit_assignment_id}`, {unit_assignment: { visible: true } })
      .then((res) => {
        const assignments = this.state.assignments.map((assignment) => {
          if(assignment.id === id) assignment.visible = true;
          return assignment;
        })
        this.setState({ assignments });
      })
      .catch((err) => console.log(err));
    }
  }

  toggleQuizVisibility = (visible, id, unit_quiz_id) => {
    if(visible) {
      axios.put(`/api/unit_quizzes/${unit_quiz_id}`, {unit_quiz: { visible: false } })
      .then((res) => {
        const quizzes = this.state.quizzes.map((quiz) => {
          if(quiz.id === id) quiz.visible = false;
          return quiz;
        })
        this.setState({ quizzes });
      })
      .catch((err) => console.log(err));
    } else {
      axios.put(`/api/unit_quizzes/${unit_quiz_id}`, {unit_quiz: { visible: true } })
      .then((res) => {
        const quizzes = this.state.quizzes.map((quiz) => {
          if(quiz.id === id) quiz.visible = true;
          return quiz;
        })
        this.setState({ quizzes });
      })
      .catch((err) => console.log(err));
    }
  }

  setAssignmentDueDate = (due_date, unit_assignment_id) => {
    axios.put(`/api/unit_assignments/${unit_assignment_id}`, {unit_assignment: { due_date } })
    .then((res) => {
      const assignments = this.state.assignments.map((assignment) => {
        if(assignment.unit_assignment_id === unit_assignment_id) assignment.due_date = due_date;
        return assignment;
      })
      this.setState({ assignments });
    })
    .catch((err) => console.log(err));
  }

  setQuizDueDate = (due_date, unit_quiz_id) => {
    axios.put(`/api/unit_quizzes/${unit_quiz_id}`, {unit_quiz: { due_date } })
    .then((res) => {
      const quizzes = this.state.quizzes.map((quiz) => {
        if(quiz.unit_quiz_id === unit_quiz_id) quiz.due_date = due_date;
        return quiz;
      })
      this.setState({ quizzes });
    })
    .catch((err) => console.log(err));
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  };

  sequenceChange = (oldIndexes) => {
    const materials = oldIndexes.map((oldIndexes, index) => {
      let material = this.state.materials[oldIndexes];
      return material;
    })
    this.setState({ materials }, () => {
        axios.put(`/api//units/update_material_sequence`, { materials: materials })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    });
  }

  renderMaterials = () => {
    return this.state.materials.map((material, index) => {
      if(material.material === "content") return (
          <ContentBlock
          key={material.id}
          content={material}
          unit={this.props.unit}
          index={index}
          deleteUnitContent={this.deleteUnitContent}
          toggleContentVisibility={this.toggleContentVisibility}
        />
      )
      else if (material.material === "assignment") return (
        <AssignmentBlock
          key={material.id}
          assignment={material}
          unit={this.props.unit}
          index={index}
          course_id={this.props.courseId}
          deleteUnitAssignment={this.deleteUnitAssignment}
          toggleAssignmentVisibility={this.toggleAssignmentVisibility}
          setAssignmentDueDate={this.setAssignmentDueDate}
        />
      )
      else if (material.material === "quiz") return (
        <QuizBlock
          key={material.id}
          quiz={material}
          unit={this.props.unit}
          index={index}
          deleteUnitQuiz={this.deleteUnitQuiz}
          toggleQuizVisibility={this.toggleQuizVisibility}
          setQuizDueDate={this.setQuizDueDate}
          course_id={this.props.courseId}
        />
      )
    })
  }

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
            height="29rem"
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
            height="29rem"
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
            height="29rem"
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
        <>
          <UnitText data-id={JSON.stringify(this.props.unit)} >
            <VisibilityButton onClick={() => this.toggleUnitVisibility()}>
              { this.state.unit.visible
                ? <Icon name='eye' />
                : <Icon name='eye slash' />
              }
            </VisibilityButton>
            <UnitToggle onClick={() => this.toggleEditing()} > {unit.title} </UnitToggle>
          </UnitText>
        </>
      );
    else
      return (
        <UnitForm 
          onSubmit={this.handleSubmit} 
          ref={this.formRef} 
          data-id={JSON.stringify(this.props.unit)} 
        >
          <FormTop>
            <h3>Unit Management</h3>

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
              <DeleteIcon>
                <Icon 
                  name="trash alternate outline" 
                  size="large" 
                  onClick={() => deleteUnit(unit.id)}
                />
              </DeleteIcon>
            </div>
          </FormTop>
          <FormBottom>
            <FormBottomLeft>
            <div>
              <SearchToggle
                style={this.state.search === "contents" ? {
                  backgroundColor: "white",
                  color: "#23a24d"
                } : null}
                value='contents'
                onClick={this.toggleSearchBar}
              >
                Contents
              </SearchToggle>
              <SearchToggle
                style={this.state.search === "assignments" ? {
                  backgroundColor: "white",
                  color: "#23a24d"
                } : null}
                value='assignments'
                onClick={this.toggleSearchBar}
              >
                Assignments
              </SearchToggle>
              <SearchToggle
                style={this.state.search === "quizzes" ? {
                  backgroundColor: "white",
                  color: "#23a24d"
                } : null}
                value='quizzes'
                onClick={this.toggleSearchBar}
              >
                Quizzes
              </SearchToggle>
            </div>

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
                <MaterialsContainer>
                  <ReactSortable onChange={(newMaterials) => this.sequenceChange(newMaterials) } >
                    { this.renderMaterials() }
                  </ReactSortable>
                </MaterialsContainer>
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
  cursor: grab;

  active: { cursor: grabbing; }
`;

const UnitToggle = styled.span`
  cursor: pointer;

  :hover {
    color: #2979ff;
  }
`

const VisibilityButton = styled.button`
  display: inline;
  text-decoration: none;
  background-color: transparent;
  color: grey;
  margin-right: 1rem;
  border: none;
  cursor: pointer;

  hover {
    color: color: #2979ff;;
  }
`

const ContentHeading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
`;

const UnitForm = styled.div`
  height: 37rem;
  opacity: 1;
  width: 90%;
  margin: 2rem auto 0 auto;
  border: 1px solid #bdbdbd;
  border-top: none;
  border-radius: 5px;
  overflow: hidden;
  transition-duration: 0.5s;
  background-color: #23a24d;
  padding: 1rem;
`;

const FormTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3rem;
  color: white;
`;

const FormBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormBottomLeft = styled.div`
  height: 32rem;
  width: calc(50% - 0.5rem);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
`;
const FormBottomRight = styled.div`
  position: relative;
  height: 32rem;
  width: calc(50% - 0.5rem);
  padding-top: 3rem;
`;

const MaterialsContainer = styled.div`
  height: 29rem;
  overflow: auto;
  background-color: white;
  border-radius: 5px;
`

const SearchToggle = styled.button`
  display; inline-block;
  background-color: transparent;
  color: white;
  height: 3rem;
  border: none;
  padding: 0 0.5rem;
  cursor: pointer;
  outline: none;
`

const DeleteIcon = styled.span`
  cursor: pointer;
  :hover {
    color: #2979ff;
  }
`

export default UnitControls;
