import React from "react";
import { Layout, Button, Row, Col, PageHeader } from "antd";

import "../style/Navigation.css";

const { Header } = Layout;

function Navigation({ isLogin, successLogout }) {
  let renderHeader;

  if (isLogin) {
    renderHeader = (
      <Col span={6} push={3}>
        <Button onClick={successLogout}>로그아웃</Button>
      </Col>
    );
  }

  return (
    <Header style={{ background: "#fff" }}>
      <Row>
        <Col span={18}>
          <PageHeader title="UMS" />
        </Col>
        {renderHeader}
      </Row>
    </Header>
  );
}

export default Navigation;
