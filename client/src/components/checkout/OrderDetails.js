import React from 'react';
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  return (
    <Container>
      <TitleContainer color={color}>
        <CardTitle>{title.charAt(0).toUpperCase() + title.slice(1)}</CardTitle>
      </TitleContainer>
      <DetailsContainer>
        <PriceContainer>
          <CardPrice>${price}</CardPrice>
          <CardSubtitle>/student/month</CardSubtitle>
        </PriceContainer>
        <SummaryContainer color={color}>{summary}</SummaryContainer>
        <FineDetailsContainer>
          The {title} Plan includes:
          {details.map(detail => {
            return <Detail>{detail}</Detail>;
          })}
        </FineDetailsContainer>
      </DetailsContainer>
      <Link to="/checkout">
        <LearnMore>Learn More</LearnMore>
      </Link>
      
    </Container>
  );
};

const Container = styled.div`
display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 22rem;
  min-height: 30rem;
  text-align: center;
  margin: 0.5rem;

  border: 1px solid ${props => props.color || GlobalColors.PrimaryBlue};
  border-radius: 10px;
`

const TitleContainer = styled.div`
  background-color: ${props => props.color || GlobalColors.PrimaryBlue};
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardTitle = styled.h1`
  color: ${GlobalColors.PrimaryWhite};
`;

export default OrderDetails;


const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 25rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;
const CardPrice = styled.h2`
  margin: 0;
  font-size: 3rem;
`;
const CardSubtitle = styled.h4`
  margin: 0;
  padding-top: 1rem;
`;
const SummaryContainer = styled.h3`
  width: 100%;
  border-top: 1px solid ${props => props.color || GlobalColors.PrimaryBlue};
  border-bottom: 1px solid ${props => props.color || GlobalColors.PrimaryBlue};

  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const FineDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;
  text-align: left;
`;
const Detail = styled.li`
  text-align: left;
  padding-top: 0.3rem;
`;

const LearnMore = styled.h3`
  padding: 0.5rem;
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;

  color: ${GlobalColors.PrimaryBlack};
`;

export default PricingCard;
