import React from 'react';
import HomeNav from "../home/HomeNav";
import styled from 'styled-components';
import PricingCard from './PricingCard';
import { GlobalColors } from '../../styles/GlobalStyles';


const PricingView = () => {
  return (
    <>
      <HomeNav />
      <PricingContainer>
        <PricingHeader>Pricing for Bootcamps and Schools</PricingHeader>
        <PricingCard title="free" price={"0"} summary={"Small School"} details={["Large set of LMS Features", "Unlimited Teacher Accounts"]} link={"/cart"} color={GlobalColors.PrimaryGreen}/>
      </PricingContainer>
    </>
  );
};


const PricingContainer = styled.div`
  /* margin-top: 8rem; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

const PricingHeader = styled.h1`

`


export default PricingView;