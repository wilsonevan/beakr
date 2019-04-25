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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-decorattion: none;
    font-size: 1.25rem;
    letter-spacing: 2px;
    color: grey;
    background-color: white;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    text-align: left;
    transition-duration: 0.1s;
    cursor: pointer;

    :hover {
        color: #23a24d;
        background-color: #f7f7f7;
    }
`

export default CourseItem;
