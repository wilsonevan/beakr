import React from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";

const ProgressButton = props => {
  return (
    <>
      <Button onClick={() => props.setActiveItem(props.index)}>
        {props.name}
      </Button>
    </>
  );
};

const Button = styled.div`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: ${GlobalColors.PrimaryGreen};
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;
  margin: 0.5rem;

  :hover {
    color: white;
    background-color: ${GlobalColors.SecondaryGreen};
  }

  :active {
    box-shadow: 0 0 0 3px ${GlobalColors.SecondaryGrey};
    background-color: white;
    color: ${GlobalColors.PrimaryBlue};
  }
`;

export default ProgressButton;
