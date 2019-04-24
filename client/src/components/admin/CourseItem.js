import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { ButtonRed, } from "../../styles/Components";
import { Link } from "react-router-dom";

const CourseItem = ({ result, updateSearch }) => {

    const handleDelete = (result) => {
         axios.delete(`/api/courses/${result.id}`)
        .then(res => {
            updateSearch()
        })
        
    }

    return(
        <ItemContainer>
            <Link to={`/admin/courses/${result.id}`} style={{width: "100%"}} >
                <Item>
                    { result.title }
                </Item>
            </Link>
            <ButtonContainer>
                <ButtonRed onClick={() => handleDelete(result)}>
                    Delete
                </ButtonRed>
            </ButtonContainer>
        </ItemContainer>
    )
}


const ItemContainer = styled.div`
    position: relative;
    width: 100%;
`

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-decorattion: none;
    font-size: 1.75rem;
    letter-spacing: 2px;
    color: #23a24d;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    text-align: left;
    transition-duration: 0.1s;
    cursor: pointer;

    :hover {
        color: #2979ff;
        background-color: #f7f7f7;
    }
`
const ButtonContainer = styled.div`
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 1rem;
`


export default CourseItem;