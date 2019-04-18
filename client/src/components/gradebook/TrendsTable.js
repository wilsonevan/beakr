import React from "react";
import { Line } from "react-chartjs-2";
import {
  ChartContainer,
  Split,
  HeaderSummary,
  SummaryContainer,
  chartColors
} from "./GradeBookStyles";
import dateFns from "date-fns";

const TrendsTable = ({ grades, courses }) => {
  // RETURN - Array of months used (for the x-axis of the chart)
  const calcMonths = () => {
    // find min/max dates of all assignments in all courses
    const firstMonth = dateFns.startOfMonth(grades[0].due_date);
    const lastMonth = dateFns.startOfMonth(grades[grades.length - 1].due_date);

    let months = [];
    var currentMonth;

    if (dateFns.isBefore(firstMonth, lastMonth)) {
      // Then, populate each month between, with the date being the first day of each month
      for (
        currentMonth = firstMonth;
        dateFns.isBefore(currentMonth, dateFns.addMonths(lastMonth, 1));
        currentMonth = dateFns.addMonths(currentMonth, 1)
      ) {
        months.push(currentMonth);
      }
    }
    return months;
  };

  // Calculate the total grades of all assignments/quizes, before the first day of the month after it
  // RETURN - Array of total grades as of each month (for the y-axis)
  const calcTotalGradesByMonth = (months, courseId) => {
    return months.map(month => {
      let monthlyPP = 0;
      let monthlyPA = 0;

      grades.map(grade => {
        if (
          grade.course_id === courseId &&
          dateFns.isBefore(grade.due_date, dateFns.addMonths(month, 1))
        ) {
          monthlyPP = monthlyPP + grade.points_possible;
          monthlyPA = monthlyPA + grade.points_awarded;
        }
      });

      // Calc the percent of all grades before this month
      let gradePercent;
      if (monthlyPP > 0)
        gradePercent = Math.round((monthlyPA / monthlyPP) * 100);
      else gradePercent = 0;

      return gradePercent;
    });
  };

  // Labels are x-axis values
  // Data is y-axis values

  const generateChartData = () => {
    const months = calcMonths();

    const totalGrades = courses.map(course => {
      const monthlyGrades = calcTotalGradesByMonth(months, course.id);
      return {
        label: course.title,
        // backgroundColor: "#f7f7f7",
        borderColor: chartColors[0],
        data: monthlyGrades
      };
    });

    // Format the Months
    const displayMonths = months.map(month => {
      return dateFns.format(month, "MMM");
    });

    return {
      labels: displayMonths,
      datasets: totalGrades
    };
  };

  const options = {
    legend: {
      display: true,
      position: "bottom"
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Grade (%)"
          },
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }
        }
      ]
    },
    animation: {
      easing: "easeOutCubic"
    }
  };

  if (grades)
    return (
      <SummaryContainer>
        <HeaderSummary>Trends</HeaderSummary>
        <Split />
        <ChartContainer>
          <Line
            data={generateChartData()}
            options={options}
            height={300}
            width={700}
          />
        </ChartContainer>
      </SummaryContainer>
    );
  else
    return (
      <SummaryContainer>
        <HeaderSummary>Trends</HeaderSummary>
        <Split />
        <HeaderSummary>Loading...</HeaderSummary>
      </SummaryContainer>
    );
};

export default TrendsTable;
