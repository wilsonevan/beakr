import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const CourseItem = ({ result }) => (
    <Link to={`/admin/courses/${result.id}`} style={{width: "100%"}} >
        <Item> { result.title } </Item>
    </Link>
)


const Item = styled.div`
    width: 100%;
    text-decorattion: none;
    font-size: 1.75rem;
    letter-spacing: 2px;
    color: #23a24d;
    padding: 1.5rem 1rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    text-align: left;
`

export default CourseItem;