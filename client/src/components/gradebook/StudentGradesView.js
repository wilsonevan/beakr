import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "react-progressbar.js";
import { Card, Table, Tab } from "semantic-ui-react";

const StudentGradesView = () => {
  const [courses, setCourses] = useState(0);

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

  // var ProgressBar = require('react-progressbar.js')

  const renderSummary = () => {
    var courses = [
      {
        header: "Course A",
        meta: "Current Grade: 30%"
      },
      {
        header: "Course B",
        meta: "Current Grade: 34%"
      },
      {
        header: "Course C",
        meta: "Current Grade: 27%"
      }
    ];

    var assignments = [
      {
        header: "Assignment A",
        meta: "due: tomorrow",
        description: "Lorum Ipsum"
      },
      {
        header: "Assignment B",
        meta: "due: tomorrow",
        description: "Lorum Ipsum"
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
          <Card.Group items={courses} itemsPerRow={2} />
        </TopContainer>
        <Split />
        <TopContainer>
          <HeaderSummary>Upcoming Assignments</HeaderSummary>
          <Card.Group items={assignments} itemsPerRow={2} />
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
    return <></>;
  };

  const renderRecentAssignments = () => {
    return <></>;
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

  padding: 10px;
  border: 1px solid #23a24d;
  border-radius: 5px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const HeaderSummary = styled.h2`
  // text-align: left !important;
  // color: white !important;
`;

const Split = styled.hr`
  border-color: #23a24d;
  border-top: none;
`;

const TableHeader = styled.h4``;

export default StudentGradesView;
