import React, { Component } from "react";
import axios from "axios";
import { Descriptions, Button, Badge, Modal } from "antd";

import { nCAS_REG_URL, nCAS_UNREG_URL } from "../config/common";

class GetCASInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  cancelModal = () => {
    this.setState({
      visible: false
    });
  };
  regCASSvc = () => {
    const userCTN = this.props.userInfo.CTN;
    const userCTNFront = userCTN.substring(0, 3) + "0";
    const userCTNEnd = userCTN.substring(3, 11);
    const resultCTN = userCTNFront + userCTNEnd;

    this.reqnCAS("put", nCAS_REG_URL, resultCTN);
    this.setState({
      visible: false
    });
  };

  unRegCASSvc = () => {
    const userCTN = this.props.userInfo.CTN;
    const userCTNFront = userCTN.substring(0, 3) + "0";
    const userCTNEnd = userCTN.substring(3, 11);
    const resultCTN = userCTNFront + userCTNEnd;

    this.reqnCAS("delete", nCAS_UNREG_URL, resultCTN);
    this.setState({
      visible: false
    });
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
        // console.log(resp.data.result);
        if (resp.data.result === "200") {
          this.props.getCASInfo(ctn);
        } else {
          if (method === "put") {
            console.log('가입:' + resp.data);
            alert("부가서비스 가입에 실패했습니다.");
          } else {
            console.log('해지:' + resp.data);
            alert("부가서비스 해지에 실패했습니다.");
          }
        }
      })
      .catch(err => {
        console.log("err : " + err);
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
                onClick={this.showModal}
              >
                가입하기
              </Button>
              <Modal
                title="부가서비스를 가입하시겠습니까?"
                visible={this.state.visible}
                okText="가입"
                cancelText="취소"
                onOk={this.regCASSvc}
                onCancel={this.cancelModal}
              ></Modal>
            </Descriptions.Item>
          </Descriptions>
        );
      } else {
        casInfoContent = (
          <Descriptions title="부가서비스" bordered>
            <Descriptions.Item label="부가서비스 가입여부">
              <Badge status="success" />
              가입
              <Button
                type="danger"
                style={{ marginLeft: "3vw" }}
                onClick={this.showModal}
              >
                해지하기
              </Button>
              <Modal
                title="부가서비스를 해지하시겠습니까?"
                visible={this.state.visible}
                okText="해지"
                okType="danger"
                cancelText="취소"
                onOk={this.unRegCASSvc}
                onCancel={this.cancelModal}
              ></Modal>
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
