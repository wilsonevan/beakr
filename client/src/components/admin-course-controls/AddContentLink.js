import React from "react";
import styled from "styled-components";

const AddContentLink = ({ result, unit, createUnitContent }) => {
  return (
    <ContentText onClick={() => createUnitContent(result.id)}>
      {result.title}
      <PlusContainer>+</PlusContainer>
    </ContentText>
  );
};

const ContentText = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92.5%;
  margin: 0 auto;
  padding: 0.5rem 0;
  text-align: left;
  color: grey;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  border-bottom: 1px solid rgba(150,150,150, 0.5);

  :hover {
    color: #23a24d;
  }
`;

const PlusContainer = styled.div`
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: 600;
  // border: none;
  color: #23a24d;
  cursor: pointer;
`

export default AddContentLink;
