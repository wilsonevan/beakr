import React, { useState, useEffect } from "react";
import { Table, Modal, Loader, Dimmer, Segment } from "semantic-ui-react";
import axios from "axios";
import StudentGradesView from "./StudentGradesView";
import {
  GradesContainer,
  TableHeader,
  ModalContainer,
  DataSummary,
  HeaderSummary,
  LoadingSegment
} from "./GradeBookStyles";

const AdminGradesView = ({ courseId }) => {
  // const [studentGrades, setStudentGrades] = useState(0);
  const [totalGrades, setTotalGrades] = useState(0);
  // const [upcomingAssignments, setUpcomingAssignments] = useState(0);

  useEffect(() => {
    if (courseId) {
      axios
        .get(`/api/calc_grades_all_students`, { params: { id: courseId } })
        .then(res => {
          setTotalGrades(res.data);
        });
    }
  }, []);

  const renderGrades = () => {
    if (totalGrades) {
      return (
        <GradesContainer>
          <Table celled selectable color="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Students</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Current Grade
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {totalGrades.map(grade => {
                const studentGrade = grade[0];
                return (
                  <Modal
                    trigger={
                      <Table.Row>
                        <Table.Cell singleLine>
                          <TableHeader>
                            {studentGrade.user_first_name}{" "}
                            {studentGrade.user_last_name}
                          </TableHeader>
                        </Table.Cell>
                        {studentGrade.grade_percent ? (
                          <Table.Cell textAlign="center">
                            {studentGrade.grade_percent}%
                          </Table.Cell>
                        ) : (
                          <Table.Cell textAlign="center">0%</Table.Cell>
                        )}
                      </Table.Row>
                    }
                  >
                    <ModalContainer>
                      <StudentGradesView student={studentGrade} />
                    </ModalContainer>
                  </Modal>
                );
              })}
            </Table.Body>
          </Table>
        </GradesContainer>
      );
    } else
      return (
        <GradesContainer>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </GradesContainer>
      );
  };

  if (totalGrades.length > 0) return <>{renderGrades()}</>;
  else
    return (
      <DataSummary>
        <Loader inverted>Loading</Loader>
      </DataSummary>
    );
};

export default AdminGradesView;
