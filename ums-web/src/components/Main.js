import React, { Component } from "react";
import { Layout, Row, Col, Typography } from "antd";

import Navigation from "./Navigation";
import Login from "./Login";
import MainContents from "./MainContents";

const { Footer } = Layout;
const { Title } = Typography;

class Main extends Component {
  render() {
    let renderContent;

    if (this.props.isLogin) {
      renderContent = (
        <Layout>
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
            casInfo={this.props.casInfo}
            successGetUserInfo={this.props.successGetUserInfo}
            successGetCallPlan={this.props.successGetCallPlan}
            successGetCasInfo={this.props.successGetCasInfo}
          />
          <Footer style={{textAlign: "center"}}>Cloud Engineering Team</Footer>
        </Layout>
      );
    } else {
      renderContent = (
        <Row
          style={{ height: "100vh" }}
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col span={6}>
            <Title
              style={{
                textAlign: "center",
                marginBottom: "1.5em",
                fontSize: "2vw"
              }}
            >
              User Management System
            </Title>
            <Login successLogin={this.props.successLogin} />
          </Col>
        </Row>
      );
    }

    return (
      <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
        {renderContent}
      </Layout>
    );
  }
}

export default Main;
