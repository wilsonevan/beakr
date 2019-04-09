import React from 'react'
import axios from "axios";
import styled from "styled-components";
import dateFns from "date-fns";
import { Table, Header, Image } from 'semantic-ui-react';

class AdminCourseAttendance extends React.Component {
	state = { attendanceData: [], attendanceDates: [], users: [], }

	componentDidMount() {
		// Make axios request to fetch all of the students enrolled in the course
		// Then, make an axios request for all of the existing attendance attendances for the cours
		axios.get(`/api/get_attendances`, { params: {course_id: this.props.courseId} } )
			.then( res => { 
				this.setState( { attendanceData: res.data } )
			})
	}

	renderDays() {
		const { attendanceData, attendanceDates } = this.state
		let newAttendanceDates = attendanceDates

		// Identify all dates with records, currently based only on the First User
		if (attendanceData.length > 0){
			return attendanceData[0].attendances.map( record => {
				// Format dates for user readability
				const columnDate = dateFns.format(dateFns.parse(record.record_date), 'MM/DD/YY');

				// Finally, return the header cell with the date
				return(
					<Table.HeaderCell textAlign='center'>{columnDate}</Table.HeaderCell>
				)
			})
		} 
	}

	renderAttendance() {
		const { attendanceData, attendanceDates, users, } = this.state;
		// debugger
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
							{/* Loop through all of the days for each of the users */}
							{user.attendances.map( record => {
								return(
									<Table.Cell textAlign='center'>
										{record.attendance_record}
									</Table.Cell>
								)
							})}
						</Table.Row>
					)
				})}
			</Table.Body>
		)
	}
	

	// The challenge with rendering the table is that you must render it by each row, and therefore by each user's attendance record
	render() {
		return (
			<AttendanceContainer>
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
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;
  // position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow-x: scroll;
	// background-color: white;
`;


export default AdminCourseAttendance