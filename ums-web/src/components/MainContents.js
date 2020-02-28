import React, { Component } from "react";
import { Layout, Typography } from "antd";
import axios from "axios";

import Navigation from "./Navigation";
import GetUserInfo from "./GetUserInfo";
// import GetCallPlan from "./GetCallPlan";
import GetCASInfo from "./GetCASInfo";

import {
  DAS_USER_URL,
  CAS_INFO_URL
} from "../config/common";

const { Content, Footer } = Layout;
const { Title } = Typography;

class MainContents extends Component {
  componentDidMount() {
    this.getUserInfo(
      this.props.userID,
      this.props.ONEID_KEY,
      this.props.SERVICE_CD
    );
  }

  getUserInfo = async (userID, ONEID_KEY, SERVICE_CD) => {
    await axios({
      method: "post",
      url: DAS_USER_URL,
      headers: {
        ONEID_KEY: ONEID_KEY,
        USER_ID: userID
      }
    })
      .then(resp => {
        console.log(resp.data);        
        this.props.successGetUserInfo(resp.data);
        if(resp.data.RT === "00000"){
          const userCTNTmp = resp.data.USER_INFO;
          const userCTNFront = userCTNTmp.CTN.substring(0, 3) + "0";
          const userCTNEnd = userCTNTmp.CTN.substring(3, 11);
          const resultCTN = userCTNFront + userCTNEnd;        
          this.getCASInfo(resultCTN);
        }
      })
      .catch(err => {
        // console.log("err : " + err);
        alert(err);
      });
  };

  getCASInfo = async ctn => {
    await axios({
      method: "post",
      url: CAS_INFO_URL,
      data: {
        CTN: ctn
      }
    })
      .then(resp => {
        this.props.successGetCasInfo(resp.data);
      })
      .catch(err => {
        // console.log("err : " + err);
        alert(err);
      });
  };

  render() {
    return (
      <Layout>
        <Navigation
          isLogin={this.props.isLogin}
          successLogout={this.props.successLogout}
        />
        <Content
          style={{
            margin: "50px 50px 0 50px",
            padding: "24px",
            background: "#fff"
          }}
        >
          <Title>{this.props.SERVICE_NAME}</Title>
          <GetUserInfo userInfo={this.props.userInfo} />
          {/* <GetCallPlan
            isLogin={isLogin}
            SERVICE_CD={SERVICE_CD}
            SUB_NO={userInfo.ENTR_NO}
            callPlanInfo={callPlanInfo}
            successGetCallPlan={successGetCallPlan}
          /> */}
          <GetCASInfo
            userInfo={this.props.userInfo.USER_INFO}
            casInfo={this.props.casInfo}
            getCASInfo={this.getCASInfo}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>Cloud Engineering Team</Footer>
      </Layout>
    );
  }
}

export default MainContents;
