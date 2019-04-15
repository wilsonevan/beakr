import React, { useState } from "react";
import styled from "styled-components";
// import ProgressBar from "react-progressbar.js";
import { Card, Table, Tab } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import CourseCard from './CourseCard';

const StudentGradesView = () => {
  // const [courses, setCourses] = useState(0);

  const renderSummary = () => {
    // Make sure to only display max 4 courses
    if (courses.length > 4) {
      courses.length = 4;
    }
    if (assignments.length > 4) {
      assignments.length = 4;
    }

    return (
      <SummaryContainer>
        <TopContainer>
          <HeaderSummary>Grades Summary</HeaderSummary>
          {/* <HeaderSummary>Summary</HeaderSummary> */}
          <DataSummary>
            {courses.map( course => {
              return <CourseCard course={course} />
            })}
            {/* <Card.Group fluid items={courses} itemsPerRow={2} /> */}
          </DataSummary>
        </TopContainer>
        <Split />
        <TopContainer>
          <HeaderSummary>Upcoming Assignments</HeaderSummary>
          {/* <HeaderSummary>Assignments</HeaderSummary> */}
          <DataSummary>
            <Card.Group fluid items={assignments} itemsPerRow={2} />
          </DataSummary>
        </TopContainer>
      </SummaryContainer>
    );
  };

  const renderGrades = () => {
    return (
      <Table celled selectable color="green">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Assignments</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Due Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {grades.map(grade => {
            return (
              <Table.Row>
                <Table.Cell singleLine>
                  <TableHeader as="h4">{grade.assignment}</TableHeader>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  const renderTrends = () => {
    // Labels are x-axis values
    // Data is y-axis values
    const chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Course A",
          backgroundColor: "#23a24d",
          borderColor: "#2979ff",
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    };

    return (
      <SummaryContainer>
        <HeaderSummary>Trends</HeaderSummary>
        <Split />
        <Line data={chartData} height={200} width={700} />
      </SummaryContainer>
    );
  };

  const renderRecentAssignments = () => {
    const feedbackItems = assignments.filter(assignment => {
      // Only add to array if there is feedback, otherwise skip it
      if (assignment.feedback)
        return {
          header: assignment.header,
          description: assignment.feedback
        };
    });

    return (
      <SummaryContainer>
        <HeaderSummary>Recent Feedback</HeaderSummary>
        <Split />
        <TopContainer>
          <DataSummary>
            <Card.Group items={feedbackItems} itemsPerRow={1} />
          </DataSummary>
        </TopContainer>
      </SummaryContainer>
    );
  };

  return (
    <>
      {renderSummary()}
      <br />
      {renderGrades()}
      <br />
      {renderTrends()}
      <br />
      {renderRecentAssignments()}
    </>
  );
};

const SummaryContainer = styled.div`
  // background-color: #23a24d;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  border: 1px solid #23a24d;
  border-radius: 5px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  // align-items: stretch;
  padding: 10px;
`;

const HeaderSummary = styled.h3`
  width: 30%;
  text-align: left !important;
  // display: flex;
  display: inline;
  // flex-grow: none;
  // justify-content: flex-end;
  padding: 10px;
  margin: 5px;
  // color: white !important;
`;

const Split = styled.hr`
  border-color: #23a24d;
  border-top: none;
`;

const DataSummary = styled.div`
  // text-align: left !important;
  display: flex;
  flex-grow: 16;
  align-content: stretch;
  justify-content: flex-start;
  // padding: 10px;
`;

const BottomContainer = styled.div`
  display: flex;
  // justify-content: flex-start;
  align-items: stretch;
  padding: 10px;
`;

const TableHeader = styled.h4``;

// FAKE DATA FOR TESTING

const grades = [
  {
    assignment: "Quiz A",
    grade: "87%"
  },
  {
    assignment: "Quiz B",
    grade: "60%"
  },
  {
    assignment: "Assignment C",
    grade: "12%"
  }
];

var courses = [
  {
    header: "Course A",
    grade: 89,
  },
  {
    header: "Course B",
    grade: 34,
  },
  {
    header: "Course C",
    grade: 27,
  }
];

var assignments = [
  {
    header: "Assignment A",
    meta: "due: tomorrow",
    description: "Lorum Ipsum",
    feedback: "Test"
  },
  {
    header: "Assignment B",
    meta: "due: tomorrow",
    description: "Lorum Ipsum",
    feedback: "Test"
  },
  {
    header: "Assignment C",
    meta: "due: tomorrow",
    description: "Lorum Ipsum"
  },
  {
    header: "Assignment D",
    meta: "due: tomorrow",
    description: "Lorum Ipsum"
  },
  {
    header: "Assignment E",
    meta: "due: tomorrow",
    description: "Lorum Ipsum"
  }
];

export default StudentGradesView;
