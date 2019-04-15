import React from "react";
import axios from "axios";
import AdminSection from "./AdminSection";
import styled from "styled-components";
import AddSection from "./AddSection";


class SectionIndex extends React.Component {
    state = { sections: [] };

    componentDidMount() {
        axios.get(`/api/courses/${this.props.courseId}/sections`)
        .then(res => {
            this.setState({ sections: res.data });
        })
        .catch(err => console.log(err));
    }
    
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

    render() {
        return (
          <AdminControlsContainer>
            <div className="section-container">
                <AddSection
                    courseId={this.props.courseId}
                    addSection={this.addSection}
                />
              {this.state.sections.length > 0 && this.renderSections()}
            </div>
          </AdminControlsContainer>
        );
    }
}

const AdminControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default SectionIndex;