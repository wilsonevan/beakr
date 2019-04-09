import React from 'react'
import axios from "axios";
import styled from "styled-components";
import dateFns from "date-fns";
import { Table, Header, Image } from 'semantic-ui-react';

class AdminCourseAttendance extends React.Component {
	state = { attendances: [], attendanceDates: [], users: [], }

	componentDidMount() {
		// Make axios request to fetch all of the students enrolled in the course
		// Then, make an axios request for all of the existing attendance attendances for the cours
		axios.get(`/api/get_attendances`, { params: {id: this.props.courseId} } )
			.then( res => { this.setState( { attendances: res.data } )})
	}

	renderDays() {
		const { attendances, attendanceDates } = this.state
		// debugger
		return attendances.map( record => {
			// this.setState({ attendanceDates: [...attendanceDates, record.record_date, ], })
			const columnDate = dateFns.format(dateFns.parse(record.record_date), 'MM/DD/YY')
			// debugger
			return(
				<Table.HeaderCell textAlign='center'>{columnDate}</Table.HeaderCell>
			)
		})
	}

	renderAttendance() {
		const { attendances, attendance_dates, users, } = this.state;
		return(
			<Table.Body>
				{attendances.map( records => {
					return(
						<Table.Row>
							<Table.Cell singleLine>
								<Header as='h4' image>
									<Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
									{records.first_name} {records.last_name}
								</Header>
							</Table.Cell>
							{/* Loop through all of the days for each of the users */}
							{/* {records.attendance_record.forEach( record => {
								return(
								<Table.Cell>
									{record.attendance}
								</Table.Cell>
								)
							})} */}
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
  overflow-x: scroll;
	// background-color: white;
`;


export default AdminCourseAttendance