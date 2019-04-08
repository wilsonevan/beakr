import React from 'react'

class OptionsMenu extends React.Component {

	toggleView = () => {
		this.props.toggleAttendance()
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
						onClick={ () => this.toggleView() }
						type="checkbox" 
						name="Attendance" 
						value='attendance'
						checked={ this.props.attendanceView ? 'checked' : null }
						/> Attendance
						<br />
						<input 
						type="checkbox" 
						name="Assignments" 
						value="assignments" 
						/> Assignments
						<br />
				</form>
				<br />
			</>
		)
	}
}

export default OptionsMenu