import React from "react";
import "../coursework.css";
import CourseSection from "./CourseSection";


class CourseWork extends React.Component {
    state = { names: ["week1","week2","week3","week4","week5"] }

    renderSections = () => {
        return this.state.names.map((name, index) => {
            return <CourseSection key={index} name={name} />
        })
    }

    render() {
        return (
            <>
                <div className="course-work__container" >
                    <div className="section-container" >
                        <h2 className="section-heading" >Course Work</h2>

                        { this.renderSections() }
                        {/* <div className="section" >week2 <div className="section-icon">+</div> </div>
                        <div className="section" >week3 <div className="section-icon">+</div> </div>
                        <div className="section" >week4 <div className="section-icon">+</div> </div>
                        <div className="section" >week5 <div className="section-icon">+</div> </div> */}
                    </div>
                </div>
            </>
        )
    }
}



export default CourseWork;