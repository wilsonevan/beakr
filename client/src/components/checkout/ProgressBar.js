import React from "react";
import styled from "styled-components";
import ProgressButton from "./ProgressButton";

const ProgressBar = props => {
  return (
    <ProgressContainer>
      {props.checkoutItems.map((item, index) => {
        debugger
        return (
          <ProgressButton
            name={item.props.name}
            onClick={item.props.setActiveItem(index)}
          />
        );
      })}
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProgressBar;
