import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const UserItem = ({ result }) => {
    return (
    <Link to={{
        pathname: '/profile',
        state: {
          user: result
        }}}
        style={{width: "100%"}} >
        <Item> { `${result.first_name} ${result.last_name}` } </Item>
    </Link>
    )
}


const Item = styled.div`
    width: 100%;
    text-decorattion: none;
    font-size: 1.25rem;
    letter-spacing: 2px;
    color: #23a24d;
    padding: 1rem 1rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    text-align: left;
    transition-duration: 0.1s;
    cursor: pointer;

    :hover {
        color: #0029ff;
        background-color: #f7f7f7;
    }
`

export default UserItem;