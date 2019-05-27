import React from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";
import StripeForm from "./StripeForm";
import { Elements, StripeProvider } from "react-stripe-elements";

const StripeDropIn = () => {
  return (
    <>
      <StripeProvider apiKey="pk_test_k49hu5V9S3ZA8TIur3ANY5PT00SbZi5k0E">
        <StripeContainer>
          <Elements>
            <StripeForm />
          </Elements>
        </StripeContainer>
      </StripeProvider>
    </>
  );
};

const StripeContainer = styled.div`
  /* margin-top: 8rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 80vh; */
`;

export default StripeDropIn;
