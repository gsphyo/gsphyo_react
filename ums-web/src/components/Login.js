import React, { Component } from "react";
import { Form, Input, Icon, Button, Select } from "antd";
import axios from "axios";
import { sha512, sha512_256 } from "js-sha512";
import { Base64 } from "js-base64";

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
        console.log(loginInputData.password);
        // const pwArrayBuffer = sha512.digest(loginInputData.password);
        // const pwArrayBuffer = sha512.digest(loginInputData.password);
        const pwArrayBuffer = this.toUTF8Array(loginInputData.password);
        const pwDigest = sha512_256(pwArrayBuffer);
        // const pwDigest = sha512_256(loginInputData.password);
        // const pwDigest = sha512_256(pwArrayBuffer);
        // const pwDigest = sha512(pwUpdate);
        // console.log(pwArrayBuffer);
        console.log(pwDigest);
        loginInputData.password = Base64.encode(
          // sha512.digest(loginInputData.password)
          // sha512.arrayBuffer(loginInputData.password)
          pwDigest
          // pwArrayBuffer
          //kuKDLHnfTFUB2csn7dSzWZLrDn1siSNiso58AG2QAVmr2JsplvAT9R6NzRH/4cF5bwe5FSYS5AJPiidD3eLhjQ==
          //ZjRlNjQ2Y2I5N2U5NjJhMDQ3NDMxZTg2YmZjYWExMmVlMjZmNjc2YjQ3ZGEwZGYwMGM5ZGZlMDBlYTIxMmQwMg==
          //Mjk2YmQxODZiYWFkNmY1ODkwZjAwNGRmY2ZjMzkyMTdjNTVhNmUyMjM3NGQwYzAwYzM0N2ViZWE1YTU3N2M1ZQ==
        );
        // loginInputData.password = btoa(sha512(loginInputData.password));
        console.log(loginInputData);
        this.LoginCheck(loginInputData);
      }
    });
  };

  componentDidMount(){
    const pw = '1q2w3e4r5t';
    console.log('sha512 : ' + Base64.encode(sha512(pw)));
    console.log('sha512 : ' + btoa(sha512(pw)));
    console.log('sha512_256 : ' + Base64.encode(sha512_256(pw)));
    console.log('sha512_256 : ' + btoa(sha512_256(pw)));

    console.log('sha512 digest : ' + btoa(sha512.digest(pw)));
    console.log('sha512 update : ' + btoa(sha512.update(pw)));
    console.log('sha512 arraybuffer : ' + btoa(sha512.arrayBuffer(pw)));

    console.log('sha512_256 digest : ' + btoa(sha512_256.digest(pw)));
    console.log('sha512_256 update : ' + btoa(sha512_256.update(pw)));
    console.log('sha512_256 arraybuffer : ' + btoa(sha512_256.arrayBuffer(pw)));

    console.log('Base64 decode : ' + Base64.decode('kuKDLHnfTFUB2csn7dSzWZLrDn1siSNiso58AG2QAVmr2JsplvAT9R6NzRH/4cF5bwe5FSYS5AJPiidD3eLhjQ=='));
  }

  toUTF8Array = hex => {

    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
    // let utf8 = [];
    // for (let i = 0; i < str.length; i++) {
    //   let charcode = str.charCodeAt(i);
    //   if (charcode < 0x80) utf8.push(charcode);
    //   else if (charcode < 0x800) {
    //     utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    //   } else if (charcode < 0xd800 || charcode >= 0xe000) {
    //     utf8.push(
    //       0xe0 | (charcode >> 12),
    //       0x80 | ((charcode >> 6) & 0x3f),
    //       0x80 | (charcode & 0x3f)
    //     );
    //   }
    //   // surrogate pair
    //   else {
    //     i++;
    //     // UTF-16 encodes 0x10000-0x10FFFF by
    //     // subtracting 0x10000 and splitting the
    //     // 20 bits of 0x0-0xFFFFF into two halves
    //     charcode =
    //       0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
    //     utf8.push(
    //       0xf0 | (charcode >> 18),
    //       0x80 | ((charcode >> 12) & 0x3f),
    //       0x80 | ((charcode >> 6) & 0x3f),
    //       0x80 | (charcode & 0x3f)
    //     );
    //   }
    // }
    // return utf8;
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
        console.log(resp.data);
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
