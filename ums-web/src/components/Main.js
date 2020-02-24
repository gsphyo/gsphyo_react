import React, { Component } from "react";
import { Layout, Row, Col, Typography } from "antd";

import Navigation from "./Navigation";
import Login from "./Login";
import GetUserInfo from "./GetUserInfo";
// import Register from "./Register";

import "../style/Main.css";

const { Content, Footer } = Layout;
const { Title } = Typography;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderStatus: "main" //main, login, register
    };
  }

  setRenderStatus = status => {
    this.setState({ renderStatus: status });
  };

  handlePasswordPattern = (form, value, callback) => {
    /*
            - ID가 비밀번호에 포함되는가
            - 대소문자, 숫자, 특수문자 사용
            - 동일 문자/숫자 4자리 이상 입력 불가
            - 연속된 숫자 4자리 이상 불가
            - 공백 입력 불가 처리 : handleInputPassword
        */
    // const { form } = this.props;
    const checkNumberString = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,20}$/.test(value); //문자, 숫자
    const checkStringSpe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{10,20}$/.test(
      value
    ); //문자, 특수문자 ^a-zA-Z0-9
    const checkNumSpe = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{10,20}$/.test(value); //특수문자, 숫자
    const checkSamePassword = /(\w)\1\1\1/.test(value); //동일한 문자/숫자 4자리 이상 입력 체크

    if (value) {
      if (
        form.getFieldValue("email") &&
        (value.includes(form.getFieldValue("email").split("@")[0]) ||
          value.includes(
            form
              .getFieldValue("email")
              .split("@")[1]
              .split(".")[0]
          ))
      ) {
        callback("비밀번호에 ID가 포함될 수 없습니다.");
      } else if (!checkNumberString || !checkStringSpe || !checkNumSpe) {
        callback(
          "문자, 특수문자(!@#$%^&*), 숫자가 포함된 10~20자리의 비밀번호를 입력하세요."
        );
      } else if (checkSamePassword) {
        callback("동일한 문자를 4회이상 반복할 수 없습니다.");
      } else if (!this.passwordContinue(value, 4)) {
        callback("abcd와 같이 연속된 문자를 입력할 수 없습니다.");
      }
    }
  };

  passwordContinue = (value, max) => {
    var o,
      d,
      p,
      n = 0,
      l = max == null ? 4 : max;
    for (var i = 0; i < value.length; i++) {
      var c = value.charCodeAt(i);
      if (
        i > 0 &&
        (p = o - c) > -2 &&
        p < 2 &&
        (n = p === d ? n + 1 : 0) > l - 3
      )
        return false;
      d = p;
      o = c;
    }
    return true;
  };

  handleInputPassword = e => {
    const inputPasswordSpace = e.target.value.replace(" ", "");
    e.target.value = inputPasswordSpace;
  };

  render() {
    const renderStatus = this.state.renderStatus;
    let renderContent;

    if (renderStatus === "main") {
      renderContent = (
        <Layout>
          <Content>
            <h1>Main</h1>
            <h2>Name: {this.props.userName}</h2>
            <h2>ID: {this.props.userID}</h2>
          </Content>
          <GetUserInfo
            isLogin={this.props.isLogin}
            userID={this.props.userID}
            ONEID_KEY={this.props.ONEID_KEY}
            userInfo={this.props.userInfo}
            successGetUserInfo={this.props.successGetUserInfo}
          />
          <Footer className="footer">Cloud Engineering Team</Footer>
        </Layout>
      );
    } else if (renderStatus === "login") {
      renderContent = (
        <Layout>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <Title level={2} className="content-header">
                로그인
              </Title>
              <Login
                value={100}
                successLogin={this.props.successLogin}
                setRenderStatus={this.setRenderStatus}
                handleInputPassword={this.handleInputPassword}
                handlePasswordPattern={this.handlePasswordPattern}
              />
            </Col>
          </Row>
        </Layout>
      );
    }
    // } else if (renderStatus === "register") {
    //     renderContent = (
    //         <Register
    //             setRenderStatus={this.setRenderStatus}
    //             handleInputPassword={this.handleInputPassword}
    //             handlePasswordPattern={this.handlePasswordPattern}
    //         />
    //     );
    // }

    return (
      <Layout>
        <Navigation
          isLogin={this.props.isLogin}
          renderStatus={this.state.renderStatus}
          successLogout={this.props.successLogout}
          setRenderStatus={this.setRenderStatus}
        />
        {renderContent}
      </Layout>
    );
  }
}

export default Main;
