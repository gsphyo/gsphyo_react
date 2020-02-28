import React, { Component } from "react";
import { Layout } from "antd";

import Login from "./Login";
import MainContents from "./MainContents";

class Main extends Component {
  render() {
    let renderContent;

    if (this.props.isLogin) {
      renderContent = (
        <MainContents
          isLogin={this.props.isLogin}
          userID={this.props.userID}
          userName={this.props.userName}
          ONEID_KEY={this.props.ONEID_KEY}
          SERVICE_CD={this.props.SERVICE_CD}
          SERVICE_NAME={this.props.SERVICE_NAME}
          userInfo={this.props.userInfo}
          callPlanInfo={this.props.callPlanInfo}
          casInfo={this.props.casInfo}
          successLogout={this.props.successLogout}
          successGetUserInfo={this.props.successGetUserInfo}
          successGetCallPlan={this.props.successGetCallPlan}
          successGetCasInfo={this.props.successGetCasInfo}
        />
      );
    } else {
      renderContent = <Login successLogin={this.props.successLogin} />;
    }

    return (
      <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
        {renderContent}
      </Layout>
    );
  }
}

export default Main;
