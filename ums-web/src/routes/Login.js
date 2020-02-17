import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";
import axios from "axios";

import "../style/Login.css";

class Login extends Component {
    componentDidMount() {
        if(this.props.location.state === undefined){
            this.props.history.push("/");
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.LoginCheck(values);
            }
        });
    };

    LoginCheck = async params => {
        console.log(
            `Login Check email: ${params.email}, password: ${params.password}`
        );
        await axios
            .post("http://localhost:3001/login", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    email: params.email,
                    password: params.password
                }
            })
            .then(resp => {
                // this.props.onLoginCheck(resp.data);
                console.log(resp.data);
                // console.log(this.props.location.state.successLogin);
                this.props.location.state.successLogin(resp.data);
                this.props.history.push("/");
                // this.props.history.push("/");
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
        // console.log(data);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props);
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                required: true,
                                message: "please input your email!"
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
                                message: "Please input your Password!"
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
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
                    Or <a href="/">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);

export default LoginForm;
