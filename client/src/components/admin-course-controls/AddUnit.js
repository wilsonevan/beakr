import React from "react";
import axios from "axios";
import styled from "styled-components";
import { ButtonGreen } from "../../styles/Components";
import { Form, Header } from "semantic-ui-react";

class AddUnit extends React.Component {
  state = { title: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id, addUnit } = this.props;
    const unit = this.state;
    axios
      .post(`/api/sections/${id}/units`, unit)
      .then(res => {
        this.setState({ title: "" });
        addUnit(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit} style={styles.form}>
          <FormHeading>
            <InputLabel htmlFor="title">Add Unit</InputLabel>
            <ButtonGreen>Submit</ButtonGreen>
          </FormHeading>
          <Form.Input
            required
            autoFocus
            name="title"
            value={this.state.title}
            placeholder="Unit Title"
            onChange={this.handleChange}
          />
        </Form>
      </>
    );
  }
}

const FormHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: #23a24d;
`;

const styles = {
  form: {
    width: "90%",
    margin: "1rem auto"
  }
};

export default AddUnit;
