import React from "react";
import styled from "styled-components";
import firstImage from "../../images/pano-person-view.jpg";
import codeInputImage from "../../images/code-input.png";
import HomeNav from "./HomeNav";
import Footer from './Footer';
import { ButtonGreen, ButtonBlue } from "../../styles/Components";
import { Link } from "react-router-dom";
import {GlobalColors, GlobalSizes} from '../../styles/GlobalStyles'

const Home = () => {
  return (
    <>
      <TopContainer>
        <HomeNav textColor={GlobalColors.PrimaryWhite} />
        <LeftTextContainer>
          <InnerTextContainer>
            <PrimaryText>Beakr Bootcamp LMS</PrimaryText>
            <SecondaryText>Designed by Students, for Students</SecondaryText>
            <Link to="/register">
              <ButtonGreen
                style={{
                  fontSize: "1.5rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem"
                }}
              >
                Try It Now
              </ButtonGreen>
            </Link>
          </InnerTextContainer>
        </LeftTextContainer>
      </TopContainer>
      <SecondContainer>
        <InnerContainer>
          <SecondImage src={codeInputImage} alt="code-screenshot" />
          <RightTextContainer>
              <PrimaryGreenText>Built for Bootcamps</PrimaryGreenText>
              <SecondaryGreyText>
                Build Content, Assignments, and Quizzes,
              </SecondaryGreyText>
              <SecondaryGreyText>All with Coding in Mind</SecondaryGreyText>
          </RightTextContainer>
        </InnerContainer>
      </SecondContainer>
      <Footer />
    </>
  );
};

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background-image: url(${firstImage}) !important;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  border-bottom: #23a24d;
  border-bottom-width: 3px;
  border-bottom-style: solid;
`;

const SecondContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  border-bottom: #23a24d;
  border-bottom-width: 3px;
  border-bottom-style: solid;
`;


const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const InnerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10%;
  padding-top: 5%;
  padding-right: 40%;
  padding-left: 3rem;


  @media (max-width: 600px) {
    margin-top: 5rem;
}
`

const SecondImage = styled.img`
width: 70vh;
height: auto;

@media (max-width: 600px) {
  width: 50vh;
}
`;

const LeftTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const RightTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // text-align: right;
  margin-right: 5%;
  padding: 20px;
`;

const PrimaryText = styled.h1`
  color: white !important;
  font-size: 3rem;
`;

const PrimaryGreenText = styled.h1`
  color: #23a24d !important;
  text-align: right;
`;

const SecondaryText = styled.h2`
  color: white !important;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const SecondaryGreyText = styled.h2`
  text-align: right;
  color: #455a64 !important;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export default Home;
