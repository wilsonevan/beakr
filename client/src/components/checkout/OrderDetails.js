import React from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  return (
    <Container>
      <TitleContainer>
        <CardTitle>Order Summary</CardTitle>
      </TitleContainer>
      <TotalsContainer>
        <Item>Beakr Plan:</Item>
        <Item>Plan Total: {}</Item>
        <Item>Local Tax: </Item>
        <Item>Monthly Order Total: </Item>
      </TotalsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 22rem;
  height: 14rem;
  text-align: center;
  margin: 0.5rem;
  /* position: absolute;
  top: 8rem;
  right: 5rem; */

  border: 1px solid ${GlobalColors.PrimaryGreen};
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  background-color: ${GlobalColors.PrimaryGreen};
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardTitle = styled.h1`
  color: ${GlobalColors.PrimaryWhite};
`;

const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 25rem;
  padding-top: 1rem;  
`;

const Item = styled.h4`
  font-weight: ${props => props.weight || "500"};
  margin: 0.5rem;
`;

export default OrderDetails;
