import React, { Component } from "react";
import { Form, Input, Icon, Button, Select } from "antd";
import axios from "axios";
import CryptoJS from 'crypto-js';

import {
  SERVICE_ID,
  API_ID,
  ACCESS_KEY,
  SERVICE_CD,
  DAS_LOGIN_URL
} from "../config/common";

const { Option } = Select;

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginInputData = values;
        loginInputData.password = CryptoJS.enc.Base64.stringify(CryptoJS.SHA512(loginInputData.password));
        this.LoginCheck(loginInputData);
      }
    });
  };

  validatePassword = (rule, value, callback) => {
    const { form } = this.props;
    this.handlePasswordPattern(form, value, callback);
    callback();
  };

  handlePasswordPattern = (form, value, callback) => {
    /*
        - ID가 비밀번호에 포함되는가
        - 대소문자, 숫자, 특수문자 사용
        - 동일 문자/숫자 4자리 이상 입력 불가
        - 연속된 숫자 4자리 이상 불가
        - 공백 입력 불가 처리 : handleInputPassword
    */
    const checkNumberString = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,20}$/.test(value); //문자, 숫자
    // const checkStringSpe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{10,20}$/.test(
    //   value
    // ); //문자, 특수문자 ^a-zA-Z0-9
    // const checkNumSpe = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{10,20}$/.test(value); //특수문자, 숫자
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
        // } else if (!checkNumberString || !checkStringSpe || !checkNumSpe) {
      } else if (!checkNumberString) {
        callback(
          // "문자, 특수문자(!@#$%^&*), 숫자가 포함된 10~20자리의 비밀번호를 입력하세요."
          "문자, 숫자가 포함된 10~20자리의 비밀번호를 입력하세요."
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

  LoginCheck = async params => {
    const selectParam = JSON.parse(params.select);
    await axios({
      method: "post",
      url: DAS_LOGIN_URL,
      headers: {
        SERVICE_ID: SERVICE_ID,
        API_ID: API_ID,
        ACCESS_KEY: ACCESS_KEY,
        SERVICE_CD: selectParam.serviceCD
      },
      data: {
        USER_ID: params.email,
        USER_PASSWORD: params.password
      }
    })
      .then(resp => {
        if (resp.data.RT === "00000") {
          this.props.successLogin(
            params.email,
            resp.data.USER_NAME,
            resp.data.ONEID_KEY,
            selectParam
          );
        } else if (resp.data.RT === "01003") {
          console.log(resp.data.RT_MSG);
        }
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const serviceCodeOption = SERVICE_CD.map(d => (
      <Option key={d.id} value={JSON.stringify(d)}>
        {d.serviceName}
      </Option>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item hasFeedback>
          {getFieldDecorator("select", {
            rules: [{ required: true, message: "서비스를 선택해주세요." }]
          })(
            <Select size="large" placeholder="서비스를 선택해주세요.">
              {serviceCodeOption}
            </Select>
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "올바른 이메일주소를 입력해주세요."
              },
              {
                required: true,
                message: "이메일을 입력해주세요."
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "비밀번호를 입력하세요."
              },
              {
                validator: this.validatePassword
              }
            ]
          })(
            <Input.Password
              size="large"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              maxLength={20}
              onChange={this.props.handleInputPassword}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            로그인
          </Button>
        </Form.Item>
        <Form.Item>
          <a
            className="login-form-register"
            href="https://uplus.co.kr/idi/mbrm/entr/ReqWbmbEntr.hpi"
            target="_blank"
            rel="noopener noreferrer"
          >
            회원가입하러 가기
          </a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);

export default LoginForm;
