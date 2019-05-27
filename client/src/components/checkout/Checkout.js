import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import ProgressBar from "./ProgressBar";
import OrderDetails from "./OrderDetails";
import Register from "./Register";
import PaymentForm from "./PaymentForm";
import Completion from "./Completion";
import HomeNav from "../home/HomeNav";

const Checkout = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [unlockedItems, setUnlockedItems] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    // setActiveItem(0);
    setCheckoutItems([
      <Register setActiveItem={handleSetActiveItem} name={"Register"} />,
      <PaymentForm setActiveItem={handleSetActiveItem} name={"Payment"} />,
      <Completion setActiveItem={handleSetActiveItem} name={"Complete"} />
    ]);
  }, []);

  // Handles
  const handleSetActiveItem = (n, next = false) => {
    debugger;
    if (next) {
      var newUnlockedItems = unlockedItems + 1;
      if (n <= newUnlockedItems) {
        setActiveItem(n);
      }
      debugger;
      setUnlockedItems(unlockedItems + 1);
    } else if (n <= unlockedItems) {
      debugger;
      setActiveItem(n);
    }
  };

  return (
    <>
      <HomeNav textColor={GlobalColors.PrimaryGrey} />
      <PageContainer>
        <MainContainer>
          <Header>Checkout</Header>
          <ProgressBar
            checkoutItems={checkoutItems}
            activeItem={activeItem}
            setActiveItem={handleSetActiveItem}
          />
          <CheckoutContainer>{checkoutItems[activeItem]}</CheckoutContainer>
        </MainContainer>
        <RightContainer>
          <OrderDetails />
        </RightContainer>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* align-items: center; */
  min-height: 80vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
`;

const RightContainer = styled.div``;

const CheckoutContainer = styled.div`
  height: auto;
  width: 60%;
  padding: 2rem;

  border: 1px solid ${GlobalColors.PrimaryGreen};
  border-radius: 10px;
`;

const Header = styled.h1`
  color: ${GlobalColors.PrimaryGrey};
`;

export default Checkout;
