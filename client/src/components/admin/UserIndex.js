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
                        <UsersContainer>
                            <SearchBar 
                                route={`/api/search_users`}
                                width="100%"
                                height="static"
                                placeholder="User Name ..."
                                render={(props) => <UserItem { ...props } />}
                            />
                        </UsersContainer>
                    </>
                }
            </>
        )
    }
}

const UsersContainer = styled.div`
    width: 75%;
    margin: 0 auto 3rem auto;
    padding: 1.25rem;
    text-align: center;
    background-color: #23a24d;
    border-radius: 10px;
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