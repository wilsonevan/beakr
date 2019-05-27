import React from "react";
import { Button, Form, Segment, Header } from "semantic-ui-react";
import styled from "styled-components";
import { AuthConsumer } from "../../providers/AuthProvider";
import StripeDropIn from './StripeDropIn';

class PaymentForm extends React.Component {
  state = {
    address: "",
    addressExt: "",
    city: "",
    state: "",
    zip: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { address, addressExt, city, state, zip } = this.state;
    const {
      auth: { updateUser, user }
    } = this.props;

    updateUser(
      { ...user, address, addressExt, city, state, zip },
      this.props.setActiveItem,
      () => {
        this.props.setActiveItem(2, true);
      }
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { address, addressExt, city, state, zip } = this.state;

    return (
      <>
        <Header as="h1" textAlign="center">
          Billing Address
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Street Address"
            required
            autoFocus
            name="address"
            value={address}
            placeholder="Street Address"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Street Address (cont'd)"
            name="addressExt"
            value={addressExt}
            placeholder="Street Address (cont'd)"
            onChange={this.handleChange}
          />
          <Form.Input
            label="City"
            required
            name="city"
            value={city}
            placeholder="City"
            onChange={this.handleChange}
          />
          <Form.Input
            label="State"
            required
            name="state"
            value={state}
            placeholder="State (XX)"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Zip Code"
            required
            name="zip"
            value={zip}
            placeholder="Zip Code"
            onChange={this.handleChange}
          />
          <StripeDropIn />
          <Segment textAlign="center" basic>
            <Button primary type="submit">
              Next
            </Button>
          </Segment>
        </Form>
      </>
    );
  }
}

export default class ConnectedPaymentForm extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <PaymentForm {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}
