import React from "react";
import styled from "styled-components";

const AddAssignmentLink = ({ result, unit, createUnitAssignment }) => {
  return (
    <AssignmentText onClick={() => createUnitAssignment(result.id)}>
      {result.title}
      <ViewLink
        href={`/assignments/${result.id}`}
        target="_blank"
      >
        view
      </ViewLink>
    </AssignmentText>
  );
};

const AssignmentText = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  color: grey;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  :hover {
    color: #0029ff;
  }
`;

const ViewLink = styled.a`
  display: inline-block;
  color: #0029ff;
  font-family: "Lato";
  margin-left: 0.5rem;
  font-size: 1rem;

  :hover {
    color: grey;
  }
`;

export default AddAssignmentLink;
