import React, { useState, } from 'react';
import styled from 'styled-components';
import ProgressBar from 'react-progressbar.js';

const StudentGradesView = () => {
	const [courses, setCourses] = useState(0)

	var ProgressBar = require('react-progressbar.js')
	var Circle = ProgressBar.Circle;
	
	const renderSummary = () => {
		var containerStyle = {
			width: '200px',
			height: '200px'
		};

		// var Circle = ProgressBar.Circle;
		debugger
		return(
			<SummaryContainer>
				{/* <HeaderSummary>
					Grades Summary
				</HeaderSummary> */}
				<CoursesContainer>
					{/* <Circle
						// progress={100}
						text={'test'}
						options={{strokeWidth: 2}}
						initialAnimate={true}
						containerStyle={containerStyle}
						// containerClassName={'.progressbar'} 
					/> */}
					{/* {courses.map( course => {

					})} */}
				</CoursesContainer>
			</SummaryContainer>
		)
	}


	const renderGrades = () => {
		return(
			<>
			</>
		)
	}

	
	const renderTrends = () => {
		return(
			<>
			</>
		)
	}


	const renderRecentAssignments = () => {
		return(
			<>
			</>
		)
	}


	return(
		<>
			{ renderSummary() }
			{ renderGrades() }
			{ renderTrends() }
			{ renderRecentAssignments() }
		</>
	)
}

const SummaryContainer = styled.div`
	// background-color: #23a24d;
	display: flex;
	justify-content: center;
	// color: white;
`
const HeaderSummary = styled.h1`
	text-align: left !important;;
	color: white !important;
`

const CoursesContainer = styled.div`
	// width = 40%;
`



export default StudentGradesView;