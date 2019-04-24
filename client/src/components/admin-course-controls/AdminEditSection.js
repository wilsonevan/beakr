import React from "react";
import styled from "styled-components";
import axios from "axios";
import AddUnit from "./AddUnit";
import UnitControls from "./UnitControls";
import EditSectionTitle from "./EditSectionTitle";
import { Icon } from "semantic-ui-react";
import ReactSortable from "react-sortablejs";

class AdminEditSection extends React.Component {
  state = { section: {}, units: [], editing: false };

  componentDidMount() {
    const { course_id, id } = this.props.match.params;
    axios
      .get(`/api/courses/${course_id}/sections/${id}`)
      .then(res => {
        this.setState({ section: res.data });
        return axios.get(`/api/sections/${id}/units_ordered_by_sequence`)
      })
      .then(res => this.setState({ units: res.data }))
      .catch(err => console.log(err));
  }

  updateSectionTitle = sectionTitle => {
    const { course_id, id } = this.props.match.params;
    axios
      .put(`/api/courses/${course_id}/sections/${id}`, sectionTitle)
      .then(res => {
        this.setState({ section: res.data, editing: false });
      })
      .catch(err => console.log(err));
  };

  toggleSectionVisibility = () => {
    const { course_id, id } = this.props.match.params;
    axios
      .put(`/api/courses/${course_id}/sections/${id}`, {section: { visible: !this.state.section.visible }} )
      .then(res => {
        this.setState({ section: res.data });
      })
      .catch(err => console.log(err));
  };

  deleteSection = id => {
    const courseId = this.props.match.params.course_id;
    axios
      .delete(`/api/courses/${courseId}/sections/${id}`)
      .then(res => {
        this.props.history.push(`/admin/courses/${courseId}`);
      })
      .catch(err => console.log(err));
  };

  addUnit = unit => {
    const units = [...this.state.units, unit];
    this.setState({ units });
  };

  updateUnit = newUnit => {
    const units = this.state.units.map(unit => {
      if (unit.id === newUnit.id) return newUnit;
      return unit;
    });
    this.setState({ units });
  };

  deleteUnit = id => {
    axios
      .delete(`/api/sections/${this.state.section.id}/units/${id}`)
      .then(res => {
        const units = this.state.units.filter(unit => {
          if (unit.id !== id) return true;
        });
        this.setState({ units });
      })
      .catch(err => console.log(err));
  };

  sequenceChange = (newUnits) => {
    const units = newUnits.map((unit) => {
      return JSON.parse(unit)
    });

    this.setState({ units }, () => {
        axios.put(`/api/units/update_sequence`, { units: units })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
    });
  }
    
  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  renderUnits = () => {
    return this.state.units.map(unit => {
      return (
        <UnitControls
          key={unit.id}
          unit={unit}
          section={this.state.section}
          courseId={this.props.match.params.course_id}
          deleteUnit={this.deleteUnit}
          updateUnit={this.updateUnit}
        />
      );
    });
  };

  render() {
    const { section, editing } = this.state;
    return (
      <>
        <div className="admin-edit-section__container">
          <div>
            <Heading>
              <span onClick={() => this.props.history.goBack()} >
                {"< Section"}
              </span> 
              {" "}{!editing && section.title}
              <br/>
              {!editing ? (
                <SectionEditButtons>
                  <VisibilityButton onClick={() => this.toggleSectionVisibility()}>
                    { section.visible
                      ? <Icon name='eye' size="small" />
                      : <Icon name='eye slash' size="small" />
                    }
                  </VisibilityButton>
                  <BlueLink onClick={() => this.toggleEditing()}>
                    Edit Name
                  </BlueLink>
                  <span style={{ color: "#2979ff", fontSize: "0.7rem" }}>
                    &nbsp;or&nbsp;
                  </span>
                  <BlueLink onClick={() => this.deleteSection(section.id)}>
                    Delete
                  </BlueLink>
                </SectionEditButtons>
              ) : (
                <EditSectionTitle
                  section={section}
                  updateSection={this.updateSectionTitle}
                />
              )}
            </Heading>
          </div>
          <AdminControls>
            <AddUnit id={section.id} addUnit={this.addUnit} />
            <ReactSortable onChange={(newUnits) => this.sequenceChange(newUnits) } >
              {this.renderUnits()}
            </ReactSortable>
          </AdminControls>
        </div>
      </>
    );
  }
}

const Heading = styled.div`
  display: inline-block;
  margin: 0 0.25rem 3rem 0;
  font-size: 2.25rem;
  font-weight: 600;
  color: #23a24d;
  cursor: pointer;
`;

const SectionEditButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 2rem;
`

const VisibilityButton = styled.button`
  position: relative;
  bottom: 0.15rem;
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

const BlueLink = styled.button`
  display: inline-block;
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: #2979ff;
  font-family: "Poppins";
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;

  :hover {
    color: grey;
  }

  :active {
    color: darkgrey;
  }
`;

const AdminControls = styled.div`
  background-color: white;
  min-height: 50vh;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

export default AdminEditSection;
