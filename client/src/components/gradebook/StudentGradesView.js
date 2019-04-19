import React, { useState, useEffect } from "react";
import { Card, Table, } from "semantic-ui-react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import dateFns from "date-fns";
import TrendsTable from "./TrendsTable";
import { SummaryContainer, TopContainer, GradesContainer, HeaderSummary, DataSummary, Split, TableHeader, } from './GradeBookStyles'
import { Link } from "react-router-dom";

const StudentGradesView = ({ auth }) => {
  const [courses, setCourses] = useState(0);
  const [activeCourse, setActiveCourse] = useState(0);
  const [assignmentGrades, setAssignmentGrades] = useState(0);
  const [quizGrades, setQuizGrades] = useState(0);
  const [totalGrades, setTotalGrades] = useState(0);
  const [allGrades, setAllGrades] = useState(0);
  // const [upcomingAssignments, setUpcomingAssignments] = useState(0);

  useEffect(() => {
    const id = auth.user.id;

    axios.get("/api/user_courses").then(res => {
      setCourses(res.data);
      setActiveCourse(res.data[0]);
    });
    axios.get("api/calc_total_grades", { params: { id: id } }).then(res => {
      setTotalGrades(res.data);
    });
    axios.get("/api/get_user_grades_assignments", { params: { id: id } }).then(res => {
      setAssignmentGrades(res.data);
    });
    axios.get("/api/get_user_grades_quizzes", { params: { id: id } }).then(res => {
      setQuizGrades(res.data);
    });
    axios.get("/api/get_all_user_grades", { params: { id: id } }).then(res => {
      setAllGrades(res.data);
    });
    
  }, []);


  const getUpcomingAssignments = (grades) => {
    let count = 0;
    let assignments = [];
    if (grades) {
      grades.map(grade => {
        if (dateFns.isFuture(grade.due_date) && count < 4) {
          // Since Assignments are already in order by date, take the first 4 assignments with due dates in the future
          count++;
          assignments.push({
            id: grade.submission_id,
            header: grade.title,
            meta: `due: ${dateFns.format(
              dateFns.parse(grade.due_date),
              "MM/DD/YY"
            )}`
          });
        }
      });
    }
    return assignments;
  };


  const renderSummary = (grades) => {
    // Make sure to only display max 4 courses
    if (courses.length > 4) {
      courses.length = 4;
    }
    return (
      <SummaryContainer>
        <TopContainer>
          <HeaderSummary>Grades Summary</HeaderSummary>
          <DataSummary>
            {totalGrades ? (
              <>
                {totalGrades.map((course, index) => {
                  return <CourseCard course={course} />;
                })}
              </>
            ) : (
              <>
                <HeaderSummary>Loading...</HeaderSummary>
              </>
            )}
          </DataSummary>
        </TopContainer>
        <Split />
        <TopContainer>
          <HeaderSummary>Upcoming Assignments/Quizzes</HeaderSummary>
          <DataSummary>
            <Card.Group
              fluid
              items={getUpcomingAssignments(grades)}
              itemsPerRow={2}
            />
          </DataSummary>
        </TopContainer>
      </SummaryContainer>
    );
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


  const renderGrades = (grades) => {
    if (grades) {
      return (
        <GradesContainer>
          <Table celled selectable color="green">
            <Table.Header>
              <Table.Row>
                { grades[0].assignment_id ?
                  <Table.HeaderCell textAlign="center">
                    Assignments
                  </Table.HeaderCell>
                :
                  <Table.HeaderCell textAlign="center">
                    Quizzes
                  </Table.HeaderCell>
                }
                <Table.HeaderCell textAlign="center">Due Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Score</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {grades.map(grade => {
                if (grade.course_id == activeCourse.id) {
                  return (
                    <Table.Row>
                      { grades[0].assignment_id ? 
                          <Table.Cell singleLine>
                        <Link to={`/courses/${grade.course_id}/assignments/${grade.assignment_id}`}>
                            <TableHeader as="h4">{grade.title}</TableHeader>
                        </Link>
                          </Table.Cell>
                        :
                          <Table.Cell singleLine>
                        <Link to={`/quizzes/${grade.quiz_id}`}>
                            <TableHeader as="h4">{grade.title}</TableHeader>
                        </Link>
                          </Table.Cell>
                        }
                      <Table.Cell textAlign="center">
                      { grade.due_date ?
                        <>
                        {dateFns.format(
                          dateFns.parse(grade.due_date),
                          "MM/DD/YY"
                        )}
                        </>
                        :
                        <>
                          No Date Yet
                        </>
                      }
                      </Table.Cell>
                      {grade.points_possible > 0 ? (
                        <Table.Cell textAlign="center">
                          {Math.round(
                            (grade.points_awarded / grade.points_possible) * 100
                          )}
                          %
                        </Table.Cell>
                      ) : (
                        <Table.Cell textAlign="center">0%</Table.Cell>
                      )}
                    </Table.Row>
                  );
                }
              })}
            </Table.Body>
            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>Total Grade</Table.HeaderCell>
                {totalGrades ? (
                  <>
                    {totalGrades.map(course => {
                      if (course.course_id == activeCourse.id)
                        return (
                          <Table.HeaderCell colSpan="3" textAlign="center">
                            {course.grade_percent}%
                          </Table.HeaderCell>
                        );
                    })}
                  </>
                ) : (
                  <>
                    <HeaderSummary>Loading...</HeaderSummary>
                  </>
                )}
              </Table.Row>
            </Table.Footer> */}
          </Table>
        </GradesContainer>
      );
    } else
      return (
        <GradesContainer>
          <HeaderSummary>No grades yet.</HeaderSummary>
        </GradesContainer>
      );
  };
  
  // const renderRecentAssignments = () => {
  //   const feedbackItems = assignments.filter(assignment => {
  //     // Only add to array if there is feedback, otherwise skip it
  //     if (assignment.feedback)
  //       return {
  //         header: assignment.header,
  //         description: assignment.feedback
  //       };
  //   });

  //   return (
  //     <SummaryContainer>
  //       <HeaderSummary>Recent Feedback</HeaderSummary>
  //       <Split />
  //       <TopContainer>
  //         <DataSummary>
  //           <Card.Group items={feedbackItems} itemsPerRow={1} />
  //         </DataSummary>
  //       </TopContainer>
  //     </SummaryContainer>
  //   );
  // };


  if (courses.length > 0)
    return (
      <>
        {renderSummary(allGrades)}
        <br />
        <TrendsTable grades={allGrades} courses={courses} />
        <br />
        {renderDropDown()}
        <br />
        {renderGrades(assignmentGrades)}
        <br />
        {renderGrades(quizGrades)}
        {/* <br />
        {renderRecentAssignments()} */}
      </>
    );
  else
    return (
      <DataSummary>
        <HeaderSummary>Not yet enrolled in any courses.</HeaderSummary>
      </DataSummary>
    );
};


class ConnectedStudentGradesView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <StudentGradesView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedStudentGradesView;
