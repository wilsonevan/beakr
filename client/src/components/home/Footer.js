import React from "react";
import {
  Grid,
  Header,
  List,
} from 'semantic-ui-react';
import styled from 'styled-components';

const Footer = () => (
  <FooterContainer>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Contact Us</List.Item>
              <List.Item as='a'>Religious Ceremonies</List.Item>
              <List.Item as='a'>Gazebo Plans</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Services' />
            <List link inverted>
              <List.Item as='a'>Banana Pre-Order</List.Item>
              <List.Item as='a'>DNA FAQ</List.Item>
              <List.Item as='a'>How To Access</List.Item>
              <List.Item as='a'>Favorite X-Men</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              Footer Header
            </Header>
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FooterContainer>
)

const FooterContainer = styled.div`
  background-color: black;
  padding: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`


export default Footer;
