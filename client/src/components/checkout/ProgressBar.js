import React from "react";
import styled from "styled-components";
import ProgressButton from "./ProgressButton";

const ProgressBar = props => {
  return (
    <ProgressContainer>
      {props.checkoutItems.map((item, index) => {
        return (
          <ProgressButton
            name={item.props.name}
            setActiveItem={item.props.setActiveItem}
            index={index}
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
