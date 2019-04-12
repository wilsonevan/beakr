import React from 'react'
import axios from "axios";
import styled from "styled-components";
import dateFns from "date-fns";
import { Table, Header, Image, Form, Button, } from 'semantic-ui-react';

class AdminCourseAttendance extends React.Component {
	state = { attendanceData: [], dates: [], recordDate: '', newRecords: [], courseId: '' }

	componentDidMount() {
		const {courseId} = this.props
		axios.get(`/api/get_attendances`, { params: {course_id: this.props.courseId} } )
			.then( res => { 
				this.setState( { attendanceData: res.data, courseId: courseId } )
			})
			.then( res => { // Saves the list of the dates used for the first row
				this.setState({ dates: this.identifyDates(),  })	
			})
	}

	handleCreateColumn(recordDate, courseId) {
		let newData = []
		axios.post(`/api/attendances`, {record_date: recordDate, course_id: courseId , } )
      .then( res => {
				newData = res.data
        this.setState({ attendanceData: newData, })
			})
			.then( res => { // Saves the list of the dates used for the first row
				this.setState({ dates: this.identifyDates(),  })	
			})
		}
			

	handleAttendanceChange(record, currentUser) {
		const oldStatus = record.attendance_record;
		let newStatus = oldStatus;
		const options = ['present', 'absent', 'late', '', ];
		
		// Cycle through next options, based on current state
		options.forEach( (option, index) => {
			if (option == oldStatus && index < (options.length - 1) ){
				newStatus = options[index+1];
			}
			if (option == oldStatus && index == (options.length - 1) ){ 
				newStatus = options[0]; // handle array indexing error when the end of array is reached
			}
		})

		let { attendanceData, } = this.state;

		// Make the Axios PUT request to update the DB accordingly, and then update state
		axios.put(`/api/attendances/${record.id}`, {...record, attendance_record: newStatus, })
			.then( res => {
				let newData = attendanceData.map( user => {
					if (user.user_id == currentUser.user_id ) {
						user.attendances = user.attendances.map( record => {
							if (record.id == res.data.id) {
								return record = res.data; // Find the correct record in the state, and update it with the response data
							} else {
								return record;
							}
						})
						return user;
					} 
					else {
						return user;
					}
				})
				this.setState( { attendanceData: newData });
			})
	}


	handleColumnDelete(columnDate) {
		let { attendanceData, dates, } = this.state;

		axios.delete('/api/destroy_column', { params: {course_id: this.props.courseId, record_date: columnDate, } } )
			.then( res => {
				
				// First, filter out records with the date to be deleted
				let newData = attendanceData.map( user => {
					user.attendances = user.attendances.filter( record => {
						// This statement determines what will actually filter out deleted records
						if (record.record_date == columnDate) {
							return false;
						}
						else {
							return true;
						}
					})
					return user
				})
				
				// Then, filter out the date from the dates array
				// This updates the first row, and the options row at the bottom
				let newDates = dates.filter( date => {
					if (date == columnDate) {
						return false;
					}
					else {
						return true;
					}
				})

				this.setState( { attendanceData: newData, dates: newDates, });
			})
	}


	renderColumnOptions() {
		const { dates, } = this.state;

		if (dates.length > 0){
			return dates.map( columnDate => {
				// Finally, return the header cell with each date
				return(
					<Table.Cell textAlign='center' onClick={() => this.handleColumnDelete(columnDate)} style={{cursor: 'pointer', }} >
						<div style={{borderTop: '1px solid red', padding: '5px',}}>
							Delete Day
						</div>
					</Table.Cell>
				)
			})
		} 
	}
	

	identifyDates() {
		const { attendanceData, } = this.state;
		let datesArray = []

		if (attendanceData.length > 0){
			attendanceData[0].attendances.map( record => {
				datesArray.push(record.record_date)
			})
		}
		return datesArray
	}


	renderDays() {
		const { dates, } = this.state;
		
		// Identify all dates with records, currently based only on the First User
		if (dates.length > 0){
			return dates.map( columnDate => {
				// Finally, return the header cell with each date
				return(
					<Table.HeaderCell textAlign='center'>{dateFns.format(dateFns.parse(columnDate), 'MM/DD/YY')}</Table.HeaderCell>
				)
			})
		} 
	}


	renderAttendance() {
		const { attendanceData, } = this.state;
		return(
			<Table.Body>
				{attendanceData.map( user => {
					return(
						<Table.Row>
							<Table.Cell singleLine>
								<Header as='h4' image>
									<Image src={user.image} rounded size='mini' />
									{user.first_name} {user.last_name}
								</Header>
							</Table.Cell>

							{/* Loop through all of the days with an attendance record, for each user */}
							{user.attendances.map( record => {
								const status = record.attendance_record;
								switch(status) {
									case 'present':
										return(
											<Table.Cell textAlign='center' positive onClick={() => this.handleAttendanceChange(record, user)} style={{cursor: 'pointer', userSelect: 'none', }} >
													{status}
											</Table.Cell>
										)
									case 'absent':
										return(
											<Table.Cell textAlign='center' negative onClick={() => this.handleAttendanceChange(record, user)} style={{cursor: 'pointer', userSelect: 'none', }} >
													{status}
											</Table.Cell>
										)
									case 'late':
										return(
											<Table.Cell textAlign='center' warning onClick={() => this.handleAttendanceChange(record, user)} style={{cursor: 'pointer', userSelect: 'none', }} >
													{status}
											</Table.Cell>
										)
									default:
										return(
											<Table.Cell onClick={() => this.handleAttendanceChange(record, user)} style={{cursor: 'pointer', userSelect: 'none', }}>
											</Table.Cell>
										)
								}
							})}
						</Table.Row>
					)
				})}
				<Table.Row>
					<Table.Cell textAlign='center'></Table.Cell>
					{this.renderColumnOptions()}
				</Table.Row>
			</Table.Body>
		)
	}


	handleSubmit = (e) => {
    e.preventDefault();
    const { recordDate, courseId } = this.state
    this.handleCreateColumn(recordDate, courseId)
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, }); 
  }


	renderForm() {
		const { recordDate, } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
        type='date'
        label="Add Date"
        name="recordDate"
        value={recordDate}
        onChange={this.handleChange}
        />
        <Button>Add Day</Button>
      </Form>
    );
	}
	

	render() {
		return (
			<AttendanceContainer>
				{this.renderForm()}
				<Table celled selectable color='green'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell textAlign='center'>Students</Table.HeaderCell>
							{this.renderDays()}
						</Table.Row>
					</Table.Header>
					{this.renderAttendance()}
				</Table>
			</AttendanceContainer>
		)
	}
}

const AttendanceContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  overflow-x: scroll;
`;

export default AdminCourseAttendance