import React from "react";
import axios from "axios";
import AdminSection from "./AdminSection";
import styled from "styled-components";
import AddSection from "./AddSection";
import ReactSortable from "react-sortablejs";


class SectionIndex extends React.Component {
    state = { sections: [] };

    componentDidMount() {
        axios.get(`/api/courses/${this.props.courseId}/sections_ordered_by_sequence`)
        .then(res => {
            this.setState({ sections: res.data });
        })
        .catch(err => console.log(err));
    }
    
    addSection = section => {
        const sections = [...this.state.sections, section];
        this.setState({ sections });
    };

    sequenceChange = (newSections) => {
        const sections = newSections.map((section) => {
          return JSON.parse(section)
        })
        this.setState({ sections }, () => {
            axios.put(`/api/sections/update_sequence`, {sections: sections})
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        });
      }

    renderSections = () => {
        return this.state.sections.map((section, index) => {
            return (
                <AdminSection key={section.id} title={section.title} section={section} />
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
                <ReactSortable onChange={(newSections) => this.sequenceChange(newSections) } >
                    {this.state.sections.length > 0 && this.renderSections()}
                </ReactSortable>
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