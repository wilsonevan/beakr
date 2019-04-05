import React from "react";
import styled from "styled-components";
import axios from "axios";
import AddUnit from "./AddUnit";
import UnitControls from "./UnitControls";

class AdminEditSection extends React.Component {
  state = { section: {}, units: [] };

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

  addUnit = unit => {
    const units = [unit, ...this.state.units];
    this.setState({ units });
  };

  renderUnits = () => {
    return this.state.units.map(unit => {
      return (
        <UnitControls key={unit.id} unit={unit} section={this.state.section} />
      );
    });
  };

  render() {
    const { section } = this.state;
    return (
      <>
        <div className="admin-edit-section__container">
          <div>
            <Heading onClick={() => this.props.history.goBack()}>
              {"< Section"} {section.title}{" "}
            </Heading>
            <BlueLink>Edit Name</BlueLink>
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
  margin: 0 1rem 3rem 0;
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
  //   font-weight: 600;
  letter-spacing: 2px;
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
