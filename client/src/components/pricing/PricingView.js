import React from "react";
import HomeNav from "../home/HomeNav";
import Footer from "../home/Footer";
import styled from "styled-components";
import PricingCard from "./PricingCard";
import { GlobalColors } from "../../styles/GlobalStyles";

const PricingView = () => {
  return (
    <>
      <HomeNav textColor={GlobalColors.PrimaryGrey} />
      <PricingContainer>
        <PricingHeader>Pricing for Bootcamps and Schools</PricingHeader>
        <CardContainer>
          <PricingCard
            title="Basic"
            price={"0.25"}
            summary={"Small Schools"}
            details={[
              "Large set of LMS Features",
              "Unlimited Teacher Accounts"
            ]}
            color={GlobalColors.PrimaryGreen}
          />
          <PricingCard
            title="Premium"
            price={"0.50"}
            summary={"Medium & Large Schools"}
            details={[
              "Large set of LMS Features",
              "Unlimited Teacher Accounts"
            ]}
            color={GlobalColors.PrimaryGreen}
          />
        </CardContainer>
        <PricingDetails>
          Pricing is in US dollars. We accept major credit cards, Paypal, and
          purchase orders/wire transfers for monthly payments. You can change
          your plan or cancel it at any time, and the change will go into effect
          on the next billing cycle. Pricing does not include taxes that local
          laws may require you to pay in addition to our published fees.
        </PricingDetails>
      </PricingContainer>
      <Footer />
    </>
  );
};

const PricingContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const PricingHeader = styled.h1`
  border-bottom: 1px solid ${GlobalColors.SecondaryGrey};
  padding-bottom: 0.5rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PricingDetails = styled.h5`
  padding: 2rem;
  width: 60%;
  text-align: center;
`;

export default PricingView;
