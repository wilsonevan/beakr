import React from 'react'
import { Icon, } from 'semantic-ui-react'
import './Calendar.css';

class AttendanceMarks extends React.Component {

	chooseMarks(record) {
		switch(record) {
			case 'present':
				return (
					<div className='absentStatus'>
						<p><Icon name='circle' size='small' color='green' />Present</p>
					</div>
				)
			case 'absent':
				return (
					<div className='absentStatus'>
						<p><Icon name='circle' size='small' color='red' />Absent</p>
					</div>
				)
			case 'late':
				return (
					<div className='absentStatus'>
						<p><Icon name='circle' size='small' color='yellow' />Late</p>
					</div>
				)
			default:
				return (
					<div className='absentStatus'>
						<p> <Icon name='circle outline' size='small' /> No Record </p>
					</div>
				)
		}
	}

	render() {
		return (
			<div>
				{/* {this.chooseMarks(this.props.attendance.record)} */}
			</div>

			
		)
	}
}

export default AttendanceMarks