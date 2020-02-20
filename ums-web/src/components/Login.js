import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";
import axios from "axios";
import sha512 from "js-sha512";
import { Base64 } from "js-base64";

import "../style/Login.css";

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginInputData = values;
                // console.log(loginInputData.password);
                // console.log(sha512(loginInputData.password));
                loginInputData.password = Base64.encode(
                    sha512(loginInputData.password)
                );
                // console.log("Received values of form: ", loginInputData);
                this.LoginCheck(loginInputData);
            }
        });
    };

    validatePassword = (rule, value, callback) => {
        const { form } = this.props;
        this.props.handlePasswordPattern(form, value, callback);
        callback();
    };

    LoginCheck = async params => {
        // console.log(
        //     `Login Check email: ${params.email}, password: ${params.password}`
        // );

        await axios
            .post("http://localhost:3001/login", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    email: params.email,
                    password: params.password
                }
            })
            .then(resp => {
                // console.log(resp.data);
                this.props.successLogin(resp.data);
                this.props.setRenderStatus("main");
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25" }}
                                />
                            }
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
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            maxLength={20}
                            onChange={this.props.handleInputPassword}
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {/* <a className="login-form-forgot" href="/">
                        Forgot password
                    </a> */}
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    {/* Or <a href="/">register now!</a> */}
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);

export default LoginForm;
