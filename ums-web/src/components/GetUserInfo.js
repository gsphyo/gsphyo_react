import React, { Component } from "react";
import { Descriptions } from "antd";

import {
  USER_TYPE,
  GENDER,
  IS_SMS,
  IS_EMAIL,
  IS_STATUS
} from "../config/common";

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
  

  render() {
    const _userType = USER_TYPE[this.props.userInfo.USER_TYPE];
    const _oneIdKey = this.props.userInfo.ONEID_KEY;
    const _userId = this.props.userInfo.USER_ID;
    const _userName = this.props.userInfo.NAME;
    const _ctn = this.props.userInfo.CTN;
    const _birthday = this.props.userInfo.BIRTHDAY;
    const _gender = GENDER[this.props.userInfo.GENDER];
    const _isSMS = IS_SMS[this.props.userInfo.IS_SMS];
    const _isEMAIL = IS_EMAIL[this.props.userInfo.IS_EMAIL];
    const _regDate = this.props.userInfo.REG_DATE;
    const _isStatus = IS_STATUS[this.props.userInfo.IS_STATUS];

    return (
      <Descriptions style={{marginBottom: "3vh"}} title="회원 정보" bordered>
        <Descriptions.Item label="구분">{_userType}</Descriptions.Item>
        <Descriptions.Item label="회원 일련번호">{_oneIdKey}</Descriptions.Item>
        <Descriptions.Item label="아이디">{_userId}</Descriptions.Item>
        <Descriptions.Item label="이름">{_userName}</Descriptions.Item>
        <Descriptions.Item label="휴대폰번호">{_ctn}</Descriptions.Item>
        <Descriptions.Item label="생년월일">{_birthday}</Descriptions.Item>
        <Descriptions.Item label="성별">{_gender}</Descriptions.Item>
        <Descriptions.Item label="문자 수신 여부">{_isSMS}</Descriptions.Item>
        <Descriptions.Item label="이메일 수신 여부">
          {_isEMAIL}
        </Descriptions.Item>
        <Descriptions.Item label="가입일">{_regDate}</Descriptions.Item>
        <Descriptions.Item label="회원상태">{_isStatus}</Descriptions.Item>
      </Descriptions>
    );
  }
}

export default GetUserInfo;
