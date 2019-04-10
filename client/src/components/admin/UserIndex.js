import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import UserItem from "./UserItem";

class UserIndex extends React.Component {
    state = {}


    render() {
        return (
            <UsersContainer>
                <SearchBar 
                    route={`/api/search_users`}
                    width="100%"
                    height="static"
                    placeholder="User Name ..."
                    render={(props) => <UserItem { ...props } />}
                />
            </UsersContainer>
        )
    }
}

const UsersContainer = styled.div`
    width: 75%;
    margin: 0 auto 3rem auto;
    padding: 2rem;
    text-align: center;
    background-color: #23a24d;
    border-radius: 10px;
`



export default UserIndex;