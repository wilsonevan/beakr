import React from 'react';
import styled from 'styled-components'

const Completion = () => {
  return (
    <>
      <CompletionText>Order Successfully Completed!</CompletionText>
    </>
  );
};

const CompletionText = styled.h2`
  text-align: center;
`

export default Completion;