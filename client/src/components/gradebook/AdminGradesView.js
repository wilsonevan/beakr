import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Table, Dropdown } from "semantic-ui-react";
import { Line } from "react-chartjs-2";
import CourseCard from "./CourseCard";
import axios from "axios";
import { AuthConsumer } from "../../providers/AuthProvider";
import dateFns from "date-fns";

const AdminGradesView = ({courseId, }) => {
  const [studentGrades, setStudentGrades] = useState(0);
  const [totalGrades, setTotalGrades] = useState(0);
  const [upcomingAssignments, setUpcomingAssignments] = useState(0);

  useEffect(() => {
    axios.get(`/api/calc_grades_all_students`, {params: {id: courseId}} )
    .then(res => {
      setTotalGrades(res.data);
    });
  }, []);

  const renderGrades = () => {
    if (totalGrades) {
      return (
        <GradesContainer>
          <Table celled selectable color="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  Students
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Current Grade</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {totalGrades.map(grade => {
                const studentGrade = grade[0];
                return (
                  <Table.Row>
                    <Table.Cell singleLine>
                      <TableHeader as="h4">{studentGrade.user_first_name} {studentGrade.user_last_name}</TableHeader>
                    </Table.Cell>
                    {studentGrade.points_possible > 0 ? (
                      <Table.Cell textAlign="center">
                        {studentGrade.points_percent}%
                      </Table.Cell>
                    ) : (
                      <Table.Cell textAlign="center">0%</Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
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

  if (totalGrades.length > 0)
  return (
    <>
      {renderGrades()}
    </>
  );
else
  return (
    <DataSummary>
      <HeaderSummary>No grades yet for this course.</HeaderSummary>
    </DataSummary>
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

const ChartContainer = styled.div`
  padding: 5px;
  padding-top: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  // align-items: stretch;
  padding: 10px;
`;

const GradesContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
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
  flex-wrap: wrap;
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


export default AdminGradesView;
