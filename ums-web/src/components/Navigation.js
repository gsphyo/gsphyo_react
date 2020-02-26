import React from "react";
import { Layout, Button, PageHeader } from "antd";

const { Header } = Layout;

function Navigation({ isLogin, successLogout }) {
  let renderHeader;

  if (isLogin) {
    renderHeader = <Button key="logout" onClick={successLogout}>로그아웃</Button>;
  }

  return (
    <Header style={{ background: "#fff" }}>
      <PageHeader title="UMS" extra={[ renderHeader ]} />
    </Header>
  );
}

export default Navigation;
