import React, { Component } from "react";
import { Layout, Typography } from "antd";
import axios from "axios";

import GetUserInfo from "./GetUserInfo";
// import GetCallPlan from "./GetCallPlan";
import GetCASInfo from "./GetCASInfo";

import {
  SERVICE_ID,
  API_ID,
  ACCESS_KEY,
  DAS_URL,
  CAS_URL
} from "../config/common";

const { Content } = Layout;
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
    await axios
      .get(`${DAS_URL}/member`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          SERVICE_ID: SERVICE_ID,
          API_ID: API_ID,
          ACCESS_KEY: ACCESS_KEY,
          SERVICE_CD: SERVICE_CD,
          ONEID_KEY: ONEID_KEY,
          USER_ID: userID
        }
      })
      .then(resp => {
        this.props.successGetUserInfo(resp.data.USER_INFO);
        // console.log(resp.data.USER_INFO.CTN);
        const userCTN = resp.data.USER_INFO.CTN;
        const userCTNFront = userCTN.substring(0, 3) + "0";
        const userCTNEnd = userCTN.substring(3, 11);

        const resultCTN = userCTNFront + userCTNEnd;
        console.log(resultCTN);
        this.getCASInfo(resultCTN);
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  };

  getCASInfo = async ctn => {
    await axios
      .post(`${CAS_URL}/CASINFO`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: {
          CTN: ctn
        }
      })
      .then(resp => {
        // this.props.successGetUserInfo(resp.data.USER_INFO);
        console.log(resp.data);
        // if(resp.data.RESPCODE === "70"){

        // }
      })
      .catch(err => {
        console.log("err : " + err);
      });
  };

  render() {
    return (
      <Content
        style={{
          margin: "50px 50px 0 50px",
          padding: "24px",
          background: "#fff"
        }}
      >
        <Title>{this.props.SERVICE_NAME}</Title>
        <GetUserInfo
          userInfo={this.props.userInfo}
        />
        {/* <GetCallPlan
            isLogin={isLogin}
            SERVICE_CD={SERVICE_CD}
            SUB_NO={userInfo.ENTR_NO}
            callPlanInfo={callPlanInfo}
            successGetCallPlan={successGetCallPlan}
          /> */}
        <GetCASInfo
          userInfo={this.props.userInfo}
        />
      </Content>
    );
  }
}

export default MainContents;
