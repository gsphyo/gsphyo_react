import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
// import Login from "./routes/Login";
// import LoginControl from "./components/LoginControl";

import "./style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userID: "",
      userName: "",
      ONEID_KEY: "",
      userInfo: []
    };
  }

  successLogin = (userID, userName, ONEID_KEY) => {
    // console.log(`successLogin : ${data.email}`);
    this.setState({ isLogin: true, userID, userName, ONEID_KEY });
    // console.log(`state: ${this.state.userInfo}`);
  };

  successLogout = () => {
    this.setState({ isLogin: false, userID: "", userInfo: [] });
  };

  successGetUserInfo = userInfo => {
      this.setState({userInfo});
  }

  render() {
    return (
      <Main
        isLogin={this.state.isLogin}
        userID={this.state.userID}
        userName={this.state.userName}
        ONEID_KEY={this.state.ONEID_KEY}
        userInfo={this.state.userInfo}
        successLogin={this.successLogin}
        successLogout={this.successLogout}
        successGetUserInfo={this.successGetUserInfo}
      />
    );
  }
}

export default App;
