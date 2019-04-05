import React from "react";
import axios from "axios";
import { Form, Header } from "semantic-ui-react";
import { ButtonGreen } from "../../styles/Components";
import styled from "styled-components";

class AddSection extends React.Component {
  state = { title: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.courseId;
    const section = this.state;
    axios
      .post(`/api/courses/${id}/sections`, section)
      .then(res => {
        this.props.addSection(res.data);
        this.setState({ title: "" });
      })
      .catch(res => {
        console.log(res);
      });
  };

  render() {
    const { title } = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit} style={styles.form}>
          <FormHeading>
            <InputLabel htmlFor="title">Add Section</InputLabel>
            <ButtonGreen>Submit</ButtonGreen>
          </FormHeading>
          <Form.Input
            id="title"
            required
            autoFocus
            name="title"
            value={title}
            placeholder="Section Title"
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
    margin: "0 auto 2rem auto"
  }
};

export default AddSection;
