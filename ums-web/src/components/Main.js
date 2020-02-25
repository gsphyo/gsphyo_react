import React, { Component } from "react";
import { Layout, Row, Col, Typography } from "antd";

import Navigation from "./Navigation";
import Login from "./Login";
import MainContents from "./MainContents";

import "../style/Main.css";

const { Footer } = Layout;
const { Title } = Typography;

class Main extends Component {
  render() {
    let renderContent;

    if (this.props.isLogin) {
      renderContent = (
        <Layout className="login-layout">
          <Navigation
            isLogin={this.props.isLogin}
            successLogout={this.props.successLogout}
          />
          <MainContents
            isLogin={this.props.isLogin}
            userID={this.props.userID}
            userName={this.props.userName}
            ONEID_KEY={this.props.ONEID_KEY}
            SERVICE_CD={this.props.SERVICE_CD}
            SERVICE_NAME={this.props.SERVICE_NAME}
            userInfo={this.props.userInfo}
            callPlanInfo={this.props.callPlanInfo}
            successGetUserInfo={this.props.successGetUserInfo}
            successGetCallPlan={this.props.successGetCallPlan}
          />
          <Footer className="footer">Cloud Engineering Team</Footer>
        </Layout>
      );
    } else {
      renderContent = (
        <Row className="login-layout" type="flex" justify="space-around" align="middle">
          <Col span={6}>
            <Title className="login-header">
              User Management System
            </Title>
            <Login successLogin={this.props.successLogin} />
          </Col>
        </Row>
      );
    }

    return <Layout>{renderContent}</Layout>;
  }
}

export default Main;
