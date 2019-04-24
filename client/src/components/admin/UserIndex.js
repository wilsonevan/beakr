import React from "react";
import SearchBar from "../SearchBar";
import styled from "styled-components";
import UserItem from "./UserItem";
import { ButtonGreen } from "../../styles/Components";
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
                            <ButtonGreen 
                                onClick={this.toggleNewUser}
                                style={{margin: "0 1rem"}}>
                                Add User
                            </ButtonGreen>
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
    padding: 1.25rem 0.75rem;
    background-color: #23a24d;
    border-radius: 5px;
    width: 97.5%;
    margin: 0 auto;
`

const UsersContainer = styled.div`
    width: 100%;
    // text-align: center;
    border-radius: 5px;
    overflow: hidden;
`

const ListHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-family: "Poppins";
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 2px;
`



export default UserIndex;