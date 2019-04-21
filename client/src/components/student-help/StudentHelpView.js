import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import ReactQuill from "react-quill";
import { ButtonGreen } from "../../styles/Components";

const StudentHelpView = ({ auth }) => {
  const [courses, setCourses] = useState("");
  const [teachers, setTeachers] = useState("");
  const [activeCourse, setActiveCourse] = useState("");
  const [body, setBody] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const id = auth.user.id;
    axios.get("/api/student_courses", { params: { id: id } }).then(res => {
      setCourses(res.data);
    });
  }, []);

  // const handleHelpSubmission = () => {
  //   const id = auth.user.id
  //   axios.get('/api/send_sms'), { params: { id: id} }
  // }

  // divRef = React.createRef()

  const handleQuillChange = (e) => {
    setBody(e);
  };

  const handleSubmit = (e) => {
    const messageBody = body;
    axios.post("/api/send_sms", { input: messageBody } ).then(res => {
      setResponseMessage(res.data);
    });
  };

  const renderDropDown = () => {
    return (
      <>
        <div class="ui green compact menu">
          <div class="ui simple dropdown item">
            Courses <i align="left" class="dropdown icon" />
            <div class="menu">
              {courses.map(course => {
                return (
                  <div class="item" onClick={() => setActiveCourse(course)}>
                    {course.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <HeaderSummary>{activeCourse.title}</HeaderSummary>
      </>
    );
  };

  if (courses)
    return (
      <ContainAll>
        <ContentContainer>
          <h2>What course do you need help with?</h2>
          {renderDropDown()}
          <h2>Please describe your issues in a sentence or two.</h2>
          <ReactQuill
            name="body"
            value={body}
            modules={modules}
            formats={formats}
            onChange={(e) => handleQuillChange(e)}
            style={{ height: "25rem", paddingBottom: "4rem" }}
          />
          <br />
          <ButtonGreen onClick={() => handleSubmit()}>Ask for Help</ButtonGreen>
        </ContentContainer>
      </ContainAll>
    );
  else return <></>;
};

const HeaderSummary = styled.h3`
  width: 30%;
  text-align: left !important;
  display: inline;
  padding: 10px;
  margin: 5px;
`;

const ContainAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
  background: #23a24d;
  padding: 1%; 
  border-radius: 5px;
`;

const ContentContainer = styled.div`
  background: white;
  width: 100%;
  padding: 10px;
`;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["color", "background"],
    ["link", "code-block", "image", "video"],
    ["clean"]
  ]
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "code-block",
  "image",
  "video"
];

class ConnectedStudentHelpView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <StudentHelpView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedStudentHelpView;
