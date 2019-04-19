import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import Flatpickr from 'react-flatpickr';

class AssignmentBlock extends React.Component {

  render() {
    const { assignment, deleteUnitAssignment, toggleAssignmentVisibility, setAssignmentDueDate } = this.props;
    console.log(assignment.due_date)
    return (
      <BlockContainer>
        <AssignmentBlockText
          href={`/assignments/${assignment.id}`}
          target="_blank"
        >
          <Tag><Icon name="edit outline" /></Tag> {assignment.title}
        </AssignmentBlockText>
          <Buttons>
            <Flatpickr
                style={{
                  border: "none",
                  color: "grey",
                  textAlign: "center",
                  fontSize: "1rem",
                  height: "100%",
                }}
                placeholder="Set Due Date"
                required
                name="recordDate"
                value={assignment.due_date}
                options={{
                  enableTime: true,
                  dateFormat: "Y-m-d H:i",
                }}
                onChange={(due_date) => setAssignmentDueDate(new Date(due_date), assignment.unit_assignment_id)} 
            />
            <ButtonLeft onClick={() => toggleAssignmentVisibility(assignment.visible, assignment.id, assignment.unit_assignment_id)} >
                { assignment.visible
                  ? <Icon name='eye' size='large' />
                  : <Icon name='eye slash' size='large' />
                }
              </ButtonLeft>
              <ButtonRight
                onClick={() => deleteUnitAssignment(assignment.id)}
              >
                <Close src={require("../../images/grey-close.svg")} alt=""/>
              </ButtonRight>
          </Buttons>
      </BlockContainer>
    )
  }
};

const BlockContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 92.50%;
  margin: 0 auto;
  padding: 1.2rem 0;
  color: grey;
  border-bottom: 1px solid rgba(100,100,100, 0.5);
  cursor: grab;
`;

const AssignmentBlockText = styled.a`
  display: inline-block;
  min-width: 30%;
  text-align: left;
  color: inherit;
  background-color: transparent;
  border: none;
  font-size: 1.15rem;
  text-align: left;
  cursor: pointer;

  :hover {
    color: #2979ff;
  }
`;

const Tag = styled.span`
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
`;

const ButtonLeft = styled.a`
  padding: 0.25rem 0.5rem;
  border: none;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  color: grey;
  font-size: 1rem;
  font-family: "Poppins";
  cursor: pointer;

  :hover {
    color: #2979ff;
  }
`;

const ButtonRight = styled.a`
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border: none;
  color: grey;
  font-size: 1rem;
  font-family: "Poppins";
  cursor: pointer;

  :hover {
    color: #2979ff;
  }
`;

const Close = styled.img`
  height: 1rem;
  width: 1rem;
  vertical-align: middle;
`

export default AssignmentBlock;
