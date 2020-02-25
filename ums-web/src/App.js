import React, { Component } from "react";
import Main from "./components/Main";

import "./style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userID: "",
      userName: "",
      ONEID_KEY: "",
      SERVICE: [],
      userInfo: [],
      callPlanInfo: []
    };
  }

  successLogin = (userID, userName, ONEID_KEY, SERVICE) => {
    this.setState({ isLogin: true, userID, userName, ONEID_KEY, SERVICE });
  };

  successLogout = () => {
    this.setState({
      isLogin: false,
      userID: "",
      userName: "",
      ONEID_KEY: "",
      SERVICE: [],
      userInfo: [],
      callPlanInfo: []
    });
  };

  successGetUserInfo = userInfo => {
    this.setState({ userInfo });
  };

  successGetCallPlan = callPlanInfo => {
    this.setState({ callPlanInfo });
  };

  render() {
    return (
      <Main
        className="wrap-app"
        isLogin={this.state.isLogin}
        userID={this.state.userID}
        userName={this.state.userName}
        ONEID_KEY={this.state.ONEID_KEY}
        SERVICE_CD={this.state.SERVICE.serviceCD}
        SERVICE_NAME={this.state.SERVICE.serviceName}
        userInfo={this.state.userInfo}
        callPlanInfo={this.state.callPlanInfo}
        successLogin={this.successLogin}
        successLogout={this.successLogout}
        successGetUserInfo={this.successGetUserInfo}
        successGetCallPlan={this.successGetCallPlan}
      />
    );
  }
}

export default App;
