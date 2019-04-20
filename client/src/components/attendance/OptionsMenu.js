import React from 'react'

class OptionsMenu extends React.Component {

	toggleAttendance = () => {
		this.props.toggleAttendance()
	}

	toggleAssignments = () => {
		this.props.toggleAssignments()
	}

	// isChecked = () => {
	// 	const {attendanceView, } = this.props;
	// 	attendanceView ? true : false
	// }

	render() {
		return (
			<>
				<form>
					<input 
						onClick={ () => this.toggleAttendance() }
						type="checkbox" 
						name="Attendance" 
						value='attendance'
						checked={ this.props.attendanceView ? 'checked' : null }
						/> Attendance
						<br />
						<input 
						onClick={ () => this.toggleAssignments() }
						type="checkbox" 
						name="Assignments" 
						value="assignments" 
						checked={ this.props.assignmentsView ? 'checked' : null }
						/> Assignments
						<br />
				</form>
				<br />
			</>
		)
	}
}

export default OptionsMenu