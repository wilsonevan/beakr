import React, { useState, useEffect } from "react";
import { Card, Table } from "semantic-ui-react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import dateFns from "date-fns";
import TrendsTable from "./TrendsTable";
import {
  SummaryContainer,
  TopContainer,
  GradesContainer,
  HeaderSummary,
  DataSummary,
  Split,
  TableHeader,
  CardHeader
} from "./GradeBookStyles";
import { Link } from "react-router-dom";

const StudentGradesView = ({ auth, student }) => {
  const [courses, setCourses] = useState(0);
  const [activeCourse, setActiveCourse] = useState(0);
  const [assignmentGrades, setAssignmentGrades] = useState(0);
  const [quizGrades, setQuizGrades] = useState(0);
  const [totalGrades, setTotalGrades] = useState(0);
  const [allGrades, setAllGrades] = useState(0);
  const [noGradesFlag, setNoGradesFlag] = useState(false);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);

  useEffect(() => {
    let id = 0;
    if (student) {
      id = student.user_id;
    } else {
      id = auth.user.id;
    }

    axios.get("/api/student_courses", { params: { id: id } }).then(res => {
      setCourses(res.data);
      setActiveCourse(res.data[0]);
      res.data.map(course => {
        axios
          .get("/api/upcoming_q_and_a", { params: { course_id: course.id } })
          .then(res => {
            setUpcomingAssignments([...upcomingAssignments, ...res.data]);
          });
      });
    });
    axios.get("/api/calc_total_grades", { params: { id: id } }).then(res => {
      setTotalGrades(res.data);
    });
    axios
      .get("/api/get_user_grades_assignments", { params: { id: id } })
      .then(res => {
        setAssignmentGrades(res.data);
      });
    axios
      .get("/api/get_user_grades_quizzes", { params: { id: id } })
      .then(res => {
        setQuizGrades(res.data);
      });
    axios.get("/api/get_all_user_grades", { params: { id: id } }).then(res => {
      setAllGrades(res.data);
    });
  }, []);

  const renderUpcomingAssignments = () => {
    let count = 0;
    if (upcomingAssignments) {
      return upcomingAssignments.map(upcomingAssignment => {
        if (
          dateFns.isFuture(upcomingAssignment.due_date) &&
          count < 4 &&
          upcomingAssignment.visible == true
        ) {
          // Since Assignments are already in order by date, take the first 4 assignments with due dates in the future
          count++;
          return (
            <Card>
              <Card.Content>
                <Link
                  to={`/courses/${upcomingAssignment.course_id}/units/${
                    upcomingAssignment.unit_id
                  }/assignments/${upcomingAssignment.assignment_id}`}
                >
                  <CardHeader>{upcomingAssignment.title}</CardHeader>
                </Link>
                <Card.Meta>
                  {`due: ${dateFns.format(
                    dateFns.parse(upcomingAssignment.due_date),
                    "MM/DD/YY"
                  )}`}
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const renderRecentAssignments = grades => {
    let count = 0;
    if (grades) {
      return grades.map(grade => {
        if (
          dateFns.isPast(grade.due_date) &&
          count < 4 &&
          grade.points_possible
        ) {
          // Since Assignments are already in order by date, take the first 4 assignments with due dates in the future
          count++;
          return (
            <Card>
              <Card.Content>
                {grades[0].assignment_id ? (
                  <Link
                    to={`/courses/${grade.course_id}/units/${
                      grades.unit_id
                    }/assignments/${grade.assignment_id}`}
                  >
                    <CardHeader>{grade.title}</CardHeader>
                  </Link>
                ) : (
                  <Link
                    to={`/courses/${grade.course_id}/units/${
                      grade.unit_id
                    }/quizzes/${grade.quiz_id}`}
                  >
                    <CardHeader>{grade.title}</CardHeader>
                  </Link>
                )}
                <Card.Meta>
                  {`due: ${dateFns.format(
                    dateFns.parse(grade.due_date),
                    "MM/DD/YY"
                  )}`}
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const renderSummary = grades => {
    // Make sure to only display max 4 courses
    if (courses.length > 4) {
      courses.length = 4;
    }
    return (
      <SummaryContainer>
        <TopContainer>
          <HeaderSummary>Current Total Grades</HeaderSummary>
          <DataSummary>
            {totalGrades ? (
              <>
                {totalGrades.map(course => {
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
          <HeaderSummary>Upcoming Assignments</HeaderSummary>
          <DataSummary>
            <Card.Group fluid>
              {renderUpcomingAssignments()}
            </Card.Group>
          </DataSummary>
        </TopContainer>
        <Split />
        <TopContainer>
          <HeaderSummary>Recent Assignments/Quizzes</HeaderSummary>
          <DataSummary>
            <Card.Group fluid>
              {renderRecentAssignments(grades)}
            </Card.Group>
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

  const renderGrades = grades => {
    if (grades) {
      if (grades[0].points_possible || grades.length > 2) {
        return (
          <GradesContainer>
            <Table celled selectable color="green">
              <Table.Header>
                <Table.Row>
                  {grades[0].assignment_id ? (
                    <Table.HeaderCell textAlign="center">
                      Assignments
                    </Table.HeaderCell>
                  ) : (
                    <Table.HeaderCell textAlign="center">
                      Quizzes
                    </Table.HeaderCell>
                  )}
                  <Table.HeaderCell textAlign="center">
                    Due Date
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Score</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {grades.map(grade => {
                  if (grade.course_id == activeCourse.id) {
                    return (
                      <Table.Row>
                        {grades[0].assignment_id ? (
                          <Table.Cell>
                            <Link
                              to={`/courses/${grade.course_id}/units/${
                                grades.unit_id
                              }/assignments/${grade.assignment_id}`}
                            >
                              <TableHeader as="h4">{grade.title}</TableHeader>
                            </Link>
                          </Table.Cell>
                        ) : (
                          <Table.Cell>
                            <Link
                              to={`/courses/${grade.course_id}/units/${
                                grade.unit_id
                              }/quizzes/${grade.quiz_id}`}
                            >
                              <TableHeader as="h4">{grade.title}</TableHeader>
                            </Link>
                          </Table.Cell>
                        )}
                        <Table.Cell textAlign="center">
                          <TableHeader>
                            {grade.due_date ? (
                              <>
                                {dateFns.format(
                                  dateFns.parse(grade.due_date),
                                  "MM/DD/YY"
                                )}
                              </>
                            ) : (
                              <>No Date Yet</>
                            )}
                          </TableHeader>
                        </Table.Cell>
                        {grade.graded && grade.points_possible > 0 ? (
                          <Table.Cell textAlign="center">
                            <TableHeader>
                              {Math.round(
                                (grade.points_awarded / grade.points_possible) *
                                  100
                              )}
                              %
                            </TableHeader>
                          </Table.Cell>
                        ) : (
                          <Table.Cell textAlign="center">
                            <TableHeader>Not Yet Graded</TableHeader>
                          </Table.Cell>
                        )}
                      </Table.Row>
                    );
                  }
                })}
              </Table.Body>
            </Table>
          </GradesContainer>
        );
      }
    } else
      return (
        <GradesContainer>
          <HeaderSummary>No grades yet.</HeaderSummary>
        </GradesContainer>
      );
  };

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
