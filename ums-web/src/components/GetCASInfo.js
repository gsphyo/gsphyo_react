import React, { Component } from "react";
import axios from "axios";
import { Descriptions, Button, Badge } from "antd";

import { nCAS_REG_URL, nCAS_UNREG_URL } from "../config/common";

class GetCASInfo extends Component {
  regCASSvc = () => {
    const userCTN = this.props.userInfo.CTN;
    const userCTNFront = userCTN.substring(0, 3) + "0";
    const userCTNEnd = userCTN.substring(3, 11);
    const resultCTN = userCTNFront + userCTNEnd;

    this.reqnCAS("put", nCAS_REG_URL, resultCTN);
  };

  unRegCASSvc = () => {
    const userCTN = this.props.userInfo.CTN;
    const userCTNFront = userCTN.substring(0, 3) + "0";
    const userCTNEnd = userCTN.substring(3, 11);
    const resultCTN = userCTNFront + userCTNEnd;

    this.reqnCAS("delete", nCAS_UNREG_URL, resultCTN);
  };

  reqnCAS = async (method, url, ctn) => {
    await axios({
      method: method,
      url: url,
      data: {
        ctn: ctn,
        soc: "LRZ0002038",
        svccd: "A01"
      }
    })
      .then(resp => {
        console.log(resp.data);
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  };

  render() {
    let casInfoContent;

    if (this.props.casInfo.RESPCODE === "00") {
      const svcAuth = this.props.casInfo.SVC_AUTH.split("|");
      if (svcAuth[0] === "0") {
        casInfoContent = (
          <Descriptions title="부가서비스" bordered>
            <Descriptions.Item label="부가서비스 가입여부">
              <Badge status="error" />
              미가입
              <Button
                type="primary"
                style={{ marginLeft: "3vw" }}
                onClick={this.regCASSvc}
              >
                가입하기
              </Button>
            </Descriptions.Item>
          </Descriptions>
        );
      } else{
        casInfoContent = (
          <Descriptions title="부가서비스" bordered>
            <Descriptions.Item label="부가서비스 가입여부">
              <Badge status="success" />
              가입
              <Button
                type="danger"
                style={{ marginLeft: "3vw" }}
                onClick={this.unRegCASSvc}
              >
                해지하기
              </Button>
            </Descriptions.Item>
          </Descriptions>
        );
      }
    } else {
      // let resultMsg;
      // if (this.props.casInfo.RESPCODE === "70"){
      //   resultMsg = CAS_RESP_INFO[this.props.casInfo.RESPCODE];
      // }
      casInfoContent = (
        <Descriptions title="부가서비스" bordered>
          <Descriptions.Item label="부가서비스 가입여부">
            <Badge status="error" />
            {/* {CAS_RESP_INFO[this.props.casInfo.RESPCODE]} */}
            부가서비스 조회 실패
          </Descriptions.Item>
        </Descriptions>
      );
    }

    return <div>{casInfoContent}</div>;
  }
}

export default GetCASInfo;
