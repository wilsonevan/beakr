import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import ProgressBar from "./ProgressBar";
import OrderDetails from "./OrderDetails";
import ContactForm from "./ContactForm";
import PaymentForm from "./PaymentForm";
import Completion from "./Completion";

const Checkout = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState([
    <ContactForm setActiveItem={setActiveItem} name={"Account Info"} />,
    <PaymentForm setActiveItem={setActiveItem} name={"Payment"} />,
    <Completion setActiveItem={setActiveItem} name={"Complete"} />
  ]);

  return (
    <>
      <PageContainer>
        <ProgressBar
          checkoutItems={checkoutItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <OrderDetails />
        <CheckoutContainer>{checkoutItems[activeItem]}</CheckoutContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 80vh;
`;

const CheckoutContainer = styled.div``;

export default Checkout;
