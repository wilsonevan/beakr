import React from 'react'
import axios from "axios";
import styled from "styled-components";
import { Grid, Header, } from 'semantic-ui-react';

class AdminCourseAttendance extends React.Component {
	state = { records: [] }

	componentDidMount() {
		// Make axios request to fetch all of the students enrolled in the course
		// Then, make an axios request for all of the existing attendance records for the cours
	}

	// The challenge with rendering the table is that you must render it by each row, and therefore by each user's attendance record
	render() {
		const { records, } = this.state
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Header as='h1'>Student</Header>
					</Grid.Column>
					{records.map( record => {
						<Grid.Column>
							{/* Display the Record Date */}
							<Header as='h1'>{record.date}</Header>
						</Grid.Column>
					})}
				</Grid.Row>
				{records.map( record => {
					<Grid.Column width={2}>
						<Header as='h3'>{record.first_name} {record.last_name}</Header>
					</Grid.Column>
					// To be completed
					record.attendances.map( attendance => {
						<Grid.Column>
							{attendance.present}
						</Grid.Column>
					})
				})}
			</Grid>
		)
	}
}


export default AdminCourseAttendance