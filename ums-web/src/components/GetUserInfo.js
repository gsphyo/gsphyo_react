import React, { Component } from "react";
import axios from "axios";
import {Typography} from 'antd';

import { SERVICE_ID, API_ID, ACCESS_KEY, DAS_URL } from "../config/common";

const {Title} = Typography;

class GetUserInfo extends Component {
  /*
GET [DAS Server]/das/member

SERVICE_ID: PAP사이트에서 발급받은 서비스 ID
API_ID: PAP 사이트에서 발급 신청한 API ID
ACCESS_KEY: PAP 사이트에서 발급한 API 인증키
SERVICE_CD: oneID에서 부여한 서비스코드
ONEID_KEY: 회원 일련번호(SEQ)
USER_ID: 회원아이디
*/
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
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  };

  render() {
    return (
      <div className="content-text">
        <Title >회원 일련번호 : {this.props.userInfo.ONEID_KEY}</Title>
        <Title >아이디 : {this.props.userInfo.USER_ID}</Title>
        <Title >이름 : {this.props.userInfo.NAME}</Title>
        <Title >휴대폰 번호 : {this.props.userInfo.CTN}</Title>
        <Title >생년월일 : {this.props.userInfo.BIRTHDAY}</Title>
        <Title >성별 : {this.props.userInfo.GENDER}</Title>
        <Title >문자 수신 여부 : {this.props.userInfo.IS_SMS}</Title>
        <Title >이메일 수신 여부 : {this.props.userInfo.IS_EMAIL}</Title>
        <Title >가입일 : {this.props.userInfo.REG_DATE}</Title>
        <Title >회원 상태 : {this.props.userInfo.IS_STATUS}</Title>
      </div>
    );
  }
}

export default GetUserInfo;
