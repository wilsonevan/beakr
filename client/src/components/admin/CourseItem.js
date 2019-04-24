import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { ButtonRed, } from "../../styles/Components";

const CourseItem = ({ result, updateSearch }) => {

    

    const handleDelete = (result) => {
         axios.delete(`/api/courses/${result.id}`)
        .then(res => {
            updateSearch()
        })
        
    }



    return(
        <Item>
            <div>
                { result.title }
            </div>
            <div>
                <ButtonRed onClick={() => handleDelete(result)}>
                    Delete
                </ButtonRed>
            </div>
        </Item>
    )
}


const Item = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    text-decorattion: none;
    font-size: 1.75rem;
    letter-spacing: 2px;
    color: #23a24d;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid rgba(100,100,100, 0.1);
    text-align: left;
    transition-duration: 0.1s;/////'
        color: #2979ff;
        background-color: #f7f7f7;
    }
`


export default CourseItem;