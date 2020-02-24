import React from "react";
import axios from "axios";
import { Button } from "antd";

import { SERVICE_ID, API_ID, ACCESS_KEY, SERVICE_CD } from "../config/common";

function GetUserInfo({ isLogin, userID, ONEID_KEY, userInfo, successGetUserInfo }) {
  // getUserInfo = async (userID, ONEID_KEY) => {
  async function getUserInfo(userID, ONEID_KEY) {
    await axios
      .get("http://localhost:3001/getUserInfo", {
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
        console.log(resp.data);
        // this.props.successLogin(params.email, resp.data.USER_NAME);
        successGetUserInfo(resp.data.USER_INFO);
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  }

  let btnGetUserInfo;
  if (isLogin) {
    btnGetUserInfo = (
      <Button
        onClick={() => {
          getUserInfo(userID, ONEID_KEY);
        }}
      >
        회원정보 조회
      </Button>
    );
  }

  return (
    <div>
      {btnGetUserInfo}
      {console.log(userInfo)}
      <h1>{userInfo.CTN}</h1>
    </div>
  );
}
/*
GET [DAS Server]/das/member

SERVICE_ID: PAP사이트에서 발급받은 서비스 ID
API_ID: PAP 사이트에서 발급 신청한 API ID
ACCESS_KEY: PAP 사이트에서 발급한 API 인증키
SERVICE_CD: oneID에서 부여한 서비스코드
ONEID_KEY: 회원 일련번호(SEQ)
USER_ID: 회원아이디
*/

export default GetUserInfo;
