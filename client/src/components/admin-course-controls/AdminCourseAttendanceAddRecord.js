import React, { Component, } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import {Button, Form } from 'semantic-ui-react'

 
class ACAAR extends Component {
  state = {
    record_date: '', newRecords: [] 
  }
 

  handleSubmit = (e) => {
    e.preventDefault();
    const { record_date, attendance_record, } = this.state
    axios.post(`/api/attendances`, {record_date: record_date}, { params: {course_id: this.props.course_id}, } )
      .then( res => {
        // this.setState({ newRecords: res.data })
        // this.props.handleCreateColumn()
        this.handleNewColumn()
      })
      .catch( res => {debugger})
  }

  handleNewColumn() {
    // debugger
    this.props.handleCreateColumn()
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, }); 
  }
  

  render() {
    const { record_date, } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        type='date'
        label="Add Date"
        name="record_date"
        value={record_date}
        onChange={this.handleChange}
        />
        <Button>Add Day</Button>
      </Form>
    );
  }
}
export default ACAAR