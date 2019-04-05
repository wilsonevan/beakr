import React from "react";
import axios from "axios";
import AdminSection from "./AdminSection";
import styled from "styled-components";
import AdminControlsNav from "./AdminControlsNav";
import AddSection from "./AddSection";

class AdminCourseControl extends React.Component {
  state = { course: {}, sections: [], selected: "edit" };

  componentDidMount() {
    axios
      .get(`/api/courses/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ course: res.data });
        return axios.get(`/api/courses/${this.props.match.params.id}/sections`);
      })
      .then(res => {
        this.setState({ sections: res.data });
      })
      .catch(err => console.log(err));
  }

  setSelected = selected => {
    this.setState({ selected });
  };

  addSection = section => {
    const sections = [...this.state.sections, section];
    this.setState({ sections });
  };

  renderSections = () => {
    return this.state.sections.map((section, index) => {
      return (
        <AdminSection key={index} title={section.title} section={section} />
      );
    });
  };

  renderContent = () => {
    const selections = {
      edit: (
        <div className="section-container">
          <AddSection
            courseId={this.state.course.id}
            addSection={this.addSection}
          />
          {this.state.sections.length > 0 && this.renderSections()}
        </div>
      )

      //   view: this.props.history.push(`/courses/${this.props.match.params.id}`);
    };

    return selections[this.state.selected];
  };

  render() {
    const { course, selected } = this.state;
    return (
      <AdminControlsContainer>
        <SectionHeading>
          {course.title && `${course.title} > Admin Controls`}
        </SectionHeading>

        <AdminControls>
          <AdminControlsNav
            selected={selected}
            setSelected={this.setSelected}
          />
          {this.renderContent()}
        </AdminControls>
      </AdminControlsContainer>
    );
  }
}

const AdminControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const AdminControls = styled.div`
  background-color: white;
  min-height: 50vh;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: #23a24d;
  letter-spacing: 2px;
  width: 80%;
`;

export default AdminCourseControl;
