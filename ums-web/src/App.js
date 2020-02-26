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
      callPlanInfo: [],
      casInfo: []
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

  successGetCasInfo = casInfo => {
    this.setState({ casInfo });
  };

  render() {
    return (
      <Main
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
        successGetCasInfo={this.successGetCasInfo}
      />
    );
  }
}

export default App;
