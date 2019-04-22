import React from "react";
import { Header } from "semantic-ui-react";
import styled from "styled-components";
import firstImage from '../images/skyline-pano-bw.jpg';
// import image from './.'

const Home = () => (
  <TopContainer style={styles.background}>
    <PrimaryText >
      <div>
        <h1>Give the gift of sound</h1>
        <h3>Branded Corporate Bluetooth Gifts</h3>
      </div>
    </PrimaryText>
  </TopContainer>
);

const TopContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-image:  url(${firstImage}) !important;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`;

const PrimaryText = styled.div`
  display: flex;
  align-items: center;
  color: white;
  margin-left: 20%;
`

const styles = {
  background: {
    display: 'flex',
    height: '80vh',
    width: '100%',
    backgroundImage: 'url("./images/skyline-pano-bw.jpg")',
  }
}

export default Home;
