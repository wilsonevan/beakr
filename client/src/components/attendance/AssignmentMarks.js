import React from "react";
import { Popup, Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import dateFns from 'date-fns';
import styled from 'styled-components';

class AssignmentMarks extends React.Component {
  chooseMarks(assignments) {
    if (assignments.length > 0) {
      // debugger;
      return (
        <>
          <Popup
            trigger={
              <div>
                {assignments.length > 1 ? (
                  <div className="assignmentStatus">
                    <p>Due: {assignments.length} Assignments</p>
                  </div>
                ) : (
                  <div className="assignmentStatus">
                    <p>Due: {assignments[0].title}</p>
                  </div>
                )}
              </div>
              // <p>Test</p>
            }
						flowing
						on='click'
						wide
          >
            <Grid centered divided columns={assignments.length}>
              {assignments.map(assignment => {
                return (
                  <Grid.Column textAlign="center">
                    {assignment.assignment_id ? (
                      <Link
                        to={`/courses/${assignment.course_id}/units/${
                          assignments.unit_id
                        }/assignments/${assignment.assignment_id}`}
                      >
                        <Header as="h4">{assignment.title}</Header>
                        <DateHeader>Due: {dateFns.format(assignment.due_date, "MM/DD/YY")}</DateHeader>
                      </Link>
                    ) : (
                      <Link
                        to={`/courses/${assignment.course_id}/units/${
                          assignment.unit_id
                        }/quizzes/${assignment.quiz_id}`}
                      >
                        <Header as="h4">{assignment.title}</Header>
                        <DateHeader>Due: {dateFns.format(assignment.due_date, "MM/DD/YY")}</DateHeader>
                      </Link>
                    )}
                  </Grid.Column>
                );
              })}
            </Grid>
          </Popup>
        </>
      );
    }
  }

  render() {
    return <>{this.chooseMarks(this.props.assignments)}</>;
  }
}

const DateHeader = styled.p`
	color: #455a64;
`

export default AssignmentMarks;
