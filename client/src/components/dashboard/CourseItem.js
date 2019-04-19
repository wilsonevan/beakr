import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CourseItem = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      key={course.id}
      style={{ width: "100%" }}
    >
      <Item> {course.title} </Item>
    </Link>
  );
};

const Item = styled.div`
  width: 100%;
  text-decorattion: none;
  font-size: 1.75rem;
  letter-spacing: 2px;
  color: #23a24d;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  text-align: left;
  transition-duration: 0.1s;
  cursor: pointer;
  background-color: #f7f7f7;

  :hover {
    color: #2979ff;
    // background-color: #f7f7f7;
  }
`;

export default CourseItem;
