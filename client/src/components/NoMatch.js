import React from 'react';
import styled from 'styled-components'

const NoMatch = ({ history }) => (
  <CenteredEverything>
  <CenteredDiv>
    <h1>Page not found</h1>
    </CenteredDiv>
    <CenteredDivButton>
    <h3 onClick={() => history.goBack()}> Go Back </h3>
  </CenteredDivButton>
  </CenteredEverything>
)

const CenteredDiv = styled.div`
  margin: 12px;
`
const CenteredDivButton = styled.div`
  background-color: #23a24d;
  border-radius: 8px;
  padding: 8px;
  color: white;

  :hover {
    background-color: #41c36c;
  }
`
const CenteredEverything = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  
`

export default NoMatch;