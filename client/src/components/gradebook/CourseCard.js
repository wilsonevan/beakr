import React, { useState } from "react";
import styled from "styled-components";
import { Doughnut, } from "react-chartjs-2";

const CourseCard = ({course,}) => {

	let totalGrade = 0
	
	if (course.grade_percent)
		totalGrade = course.grade_percent
	
	const chartData = {
			datasets: [{
				data: [totalGrade, (100-totalGrade)],
				backgroundColor: [
					'#23a24d',
					'#c4c4c4',
				],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
			'Current Grade',
			'% Remaining',
		],
		
	};

	const options = {
		cutoutPercentage: 80,
		responsive: true, 
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		layout: {
			padding: 0,
		},
		animation: {
			easing: 'easeOutCubic', 
			duration: 2000,
		},
		showTooltips: false,	
	}

	return (
		<CardContainer>
			<Header>{course.title}</Header>
			<DonutContainer>
				<DonutDiv>
					<Doughnut 
						data={chartData}
						options={options}
					/>
				</DonutDiv>
				<Grade>{totalGrade}%</Grade>
			</DonutContainer>
		</CardContainer>
	)
}

const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid grey;
	min-width: 10rem;
	min-height: 5rem;
	margin: 10px;
	padding: 10px;
	border: 1px solid #b5b5b5;
	border-radius: 5px;
	box-shadow: 0 1px 1px 1px rgba(100,100,100,0.1);
`

const DonutContainer = styled.div`
	position: relative;
	width: 100px;
	height: 100px;
`

const DonutDiv = styled.div`
	// position: absolute;
	width: 100px;
	height: 100px;
`

const Header = styled.h4`
	font-size: 1.5rem;
	padding: 0;
	// padding-left: 10px;
	margin: 0;
`

const Grade = styled.h3`
	position: absolute;
	left: 0;
	top: 38%;
	width: 105%;
	text-align: center;
	padding: 0;
	margin: 0;
`

export default CourseCard;