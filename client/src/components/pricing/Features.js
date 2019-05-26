import React from "react";
import styled from "styled-components";
import { GlobalColors, GlobalSizes } from "../../styles/GlobalStyles";
import { Link } from "react-router-dom";
import HomeNav from "../home/HomeNav";
import Footer from "../home/Footer";

const Features = () => {
  return (
    <>
      <HomeNav textColor={GlobalColors.PrimaryGrey} />
      <FeaturesContainer />
      <Footer />
    </>
  );
};

const FeaturesContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export default Features;
