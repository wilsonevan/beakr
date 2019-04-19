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
  // RETURN - Array of Weeks used (for the x-axis of the chart)
  const calcWeeks = () => {
    let firstWeek;
    let lastWeek;

    // Confirm at least one item has a due_date
    // If the first item does not have any dates, then none will, since they should be ordered
    if (grades[0].due_date) {
      // find min/max dates of all assignments in all courses
      firstWeek = dateFns.startOfWeek(grades[0].due_date);

      // Find the last assignment in the array, which actually has a due_date
      var i;
      for (i = grades.length - 1; !grades[i].due_date && i >= 0; i = i - 1) {}
      lastWeek = dateFns.startOfWeek(grades[i].due_date);
    }

    let weeks = [];
    var currentWeek;

    if (dateFns.isBefore(firstWeek, lastWeek)) {
      // Then, populate each Week between, with the date being the first day of each Week
      for (
        currentWeek = firstWeek;
        dateFns.isBefore(currentWeek, dateFns.addWeeks(lastWeek, 1));
        currentWeek = dateFns.addWeeks(currentWeek, 1)
      ) {
        weeks.push(currentWeek);
      }
    }
    return weeks;
  };

  // Calculate the total grades of all assignments/quizes, before the first day of the Week after it
  // RETURN - Array of total grades as of each Week (for the y-axis)
  const calcTotalGradesByWeek = (weeks, courseId) => {
    return weeks.map(week => {
      let weeklyPP = 0;
      let weeklyPA = 0;

      grades.map(grade => {
        if (
          grade.course_id === courseId &&
          dateFns.isBefore(grade.due_date, dateFns.addWeeks(week, 1))
        ) {
          weeklyPP = weeklyPP + grade.points_possible;
          weeklyPA = weeklyPA + grade.points_awarded;
        }
      });

      // Calc the percent of all grades before this Week
      let gradePercent;
      if (weeklyPP > 0) gradePercent = Math.round((weeklyPA / weeklyPP) * 100);
      else gradePercent = 0;

      return gradePercent;
    });
  };

  // Labels are x-axis values
  // Data is y-axis values

  const generateChartData = () => {
    const weeks = calcWeeks();

    const totalGrades = courses.map(course => {
      const weeklyGrades = calcTotalGradesByWeek(weeks, course.id);
      return {
        label: course.title,
        // backgroundColor: "#f7f7f7",
        borderColor: chartColors[0],
        data: weeklyGrades
      };
    });

    // Format the Weeks
    const displayWeeks = weeks.map(week => {
      return dateFns.format(week, "MMM Do");
    });
    return {
      labels: displayWeeks,
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

  if (grades) {
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
  } else
    return (
      <SummaryContainer>
        <HeaderSummary>Trends</HeaderSummary>
        <Split />
        <HeaderSummary>Loading...</HeaderSummary>
      </SummaryContainer>
    );
};

export default TrendsTable;
