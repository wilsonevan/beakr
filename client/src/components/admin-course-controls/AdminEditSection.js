import React from "react";
import styled from "styled-components";
import axios from "axios";
import AddUnit from "./AddUnit";
import UnitControls from "./UnitControls";
import EditSectionTitle from "./EditSectionTitle";

class AdminEditSection extends React.Component {
  state = { section: {}, units: [], editing: false };

  componentDidMount() {
    const { course_id, id } = this.props.match.params;
    axios
      .get(`/api/courses/${course_id}/sections/${id}`)
      .then(res => {
        this.setState({ section: res.data });
        return axios.get(`/api/sections/${res.data.id}/units`);
      })
      .then(res => this.setState({ units: res.data }))
      .catch(err => console.log(err));
  }

  updateSection = sectionTitle => {
    const { course_id, id } = this.props.match.params;
    axios
      .put(`/api/courses/${course_id}/sections/${id}`, sectionTitle)
      .then(res => {
        this.setState({ section: res.data, editing: false });
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
    const units = [unit, ...this.state.units];
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

  renderUnits = () => {
    return this.state.units.map(unit => {
      return (
        <UnitControls
          key={unit.id}
          unit={unit}
          section={this.state.section}
          deleteUnit={this.deleteUnit}
          updateUnit={this.updateUnit}
        />
      );
    });
  };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    const { section, editing } = this.state;
    return (
      <>
        <div className="admin-edit-section__container">
          <div>
            <Heading onClick={() => this.props.history.goBack()}>
              {"< Section"} {!editing && section.title}
            </Heading>
            {!editing ? (
              <>
                <BlueLink onClick={() => this.toggleEditing()}>
                  Edit Name
                </BlueLink>
                <span style={{ color: "#0029ff", fontSize: "0.7rem" }}>
                  &nbsp;or&nbsp;
                </span>
                <BlueLink onClick={() => this.deleteSection(section.id)}>
                  Delete
                </BlueLink>
              </>
            ) : (
              <EditSectionTitle
                section={section}
                updateSection={this.updateSection}
              />
            )}
          </div>
          <AdminControls>
            <AddUnit id={section.id} addUnit={this.addUnit} />
            {this.renderUnits()}
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

const BlueLink = styled.button`
  display: inline-block;
  text-decoration: none;
  background-color: transparent;
  border: none;
  color: #0029ff;
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
