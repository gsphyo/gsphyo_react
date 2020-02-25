import React from "react";
import { Layout, Typography, Row, Col } from "antd";

import GetUserInfo from "./GetUserInfo";
// import GetCallPlan from "./GetCallPlan";

const { Content } = Layout;
const { Title } = Typography;

function MainContents({
  isLogin,
  userID,
  userName,
  ONEID_KEY,
  SERVICE_CD,
  SERVICE_NAME,
  userInfo,
  callPlanInfo,
  successGetUserInfo,
  successGetCallPlan
}) {
  return (
    <Content className="main-content">
      <Row>
        <Col span={12}>
          <Title className="content-header">가입자 정보</Title>
          <GetUserInfo
            isLogin={isLogin}
            userID={userID}
            ONEID_KEY={ONEID_KEY}
            SERVICE_CD={SERVICE_CD}
            userInfo={userInfo}
            successGetUserInfo={successGetUserInfo}
          />
          {/* <GetCallPlan
            isLogin={isLogin}
            SERVICE_CD={SERVICE_CD}
            SUB_NO={userInfo.ENTR_NO}
            callPlanInfo={callPlanInfo}
            successGetCallPlan={successGetCallPlan}
          /> */}
        </Col>
        <Col span={12}>
          <Title className="content-header">부가서비스</Title>
        </Col>
      </Row>
    </Content>
  );
}

export default MainContents;
