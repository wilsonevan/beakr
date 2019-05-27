import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null };

  handleRegister = (user, setActiveItem ) => {
    axios
      .post("/api/auth", user)
      .then(res => {
        this.setState({ user: res.data.data });
        setActiveItem(1, true);
      })
      .catch(res => {
        alert(res);
      });
  };

  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/dashboard");
      })
      .catch(res => {
        alert('Incorrect login credentials, try again.');
      });
  };

  updateUser = (id, user) => {
    let data = new FormData();
    data.append('file', user.file);
    axios.put(`/api/users/${id}?first_name=${user.first_name}&last_name=${user.last_name}&biography=${user.biography}&email=${user.email}&birth_date=${user.birth_date}`, data)
      .then( res => this.setState({ user: res.data, }) )
  }


  handleLogout = history => {
    axios
      .delete("/api/auth/sign_out")
      .then(res => {
        this.setState({ user: null });
        history.push("/login");
      })
      .catch(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          updateUser: this.updateUser,
          setUser: user => this.setState({ user })
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const withAuth = (Component) => {
  return (props) => (
      <AuthContext.Consumer>
          { (value) => <Component {...props} {...value} /> }
      </AuthContext.Consumer>
  )
}
