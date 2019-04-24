import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import UserItem from "./UserItem";
import { ButtonBlue } from "../../styles/Components";
import AddUser from "./AddUser";

class UserIndex extends React.Component {
    state = { toggleNewUser: false }

    toggleNewUser = () => this.setState({ toggleNewUser: !this.state.toggleNewUser });


    render() {
        return (
            <>
                { this.state.toggleNewUser
                ?
                    <AddUser
                        toggleNewUser={this.toggleNewUser}
                        resetUserList={this.resetUserList}
                    />
                :   
                    <>
                        <ListHeader>
                            All Users
                            <ButtonBlue 
                                onClick={this.toggleNewUser}
                                style={{margin: "0 2rem", padding: "0.5rem 0.75rem"}}
                            >
                                Add User
                            </ButtonBlue>
                        </ListHeader>
                        <GreenBackground>
                            <UsersContainer>
                                <SearchBar 
                                    route={`/api/search_users`}
                                    width="100%"
                                    height="static"
                                    placeholder="User Name ..."
                                    render={(props) => <UserItem { ...props } />}
                                />
                            </UsersContainer>
                        </GreenBackground>
                    </>
                }
            </>
        )
    }
}

const GreenBackground = styled.div`
    padding: 0 0.75rem 1.25rem 0.75rem;
    background-color: #23a24d;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    margin: 0 auto;
`

const UsersContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
`

const ListHeader = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.75rem 1.25rem;
  margin: 0;
  font-size: 2rem;
  background-color: #23a24d;
  color: white !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`



export default UserIndex;