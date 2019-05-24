import React from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";

const PricingCard = ({ title, price, summary, details, color }) => {
  return (
    <CardContainer color={color}>
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
          The {title} plan includes:
          {details.map(detail => {
            return <Detail>{detail}</Detail>;
          })}
        </FineDetailsContainer>
        <LearnMore>Learn More</LearnMore>
      </DetailsContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  text-align: center;

  border: 1px solid ${props => props.color || GlobalColors.PrimaryBlue};
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  background-color: ${props => props.color || GlobalColors.PrimaryBlue};
  width: 100%;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const CardTitle = styled.h1`
  color: ${GlobalColors.PrimaryWhite};
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 80%;
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
`;

export default PricingCard;
