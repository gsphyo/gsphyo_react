import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, Icon } from "antd";
import sha512 from "js-sha512";
import { Base64 } from "js-base64";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    handleRegister = async params => {
        await axios
            .post("http://localhost:3001/Register", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    email: params.email,
                    password: params.password,
                    ctn: params.ctn
                }
            })
            .then(resp => {
                // this.props.onLoginCheck(resp.data);
                console.log(resp);
                this.props.setRenderStatus("login");
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const registerInputData = values;
                registerInputData.password = Base64.encode(
                    sha512(registerInputData.password)
                );
                console.log("Received values of form: ", registerInputData);
                this.handleRegister(registerInputData);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue("password")) {
            callback("위 비밀번호와 동일하지 않습니다.");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {
                force: true
            });
        }
        this.props.handlePasswordPattern(form, value, callback);
        callback();
    };

    handlePhoneNumber = e => {
        var inputNumber = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = inputNumber;

        var phone = "";
        if (inputNumber.length < 4) {
            return inputNumber;
        } else if (inputNumber.length < 7) {
            phone += inputNumber.substr(0, 3);
            phone += "-";
            phone += inputNumber.substr(3);
        } else if (inputNumber.length < 11) {
            phone += inputNumber.substr(0, 3);
            phone += "-";
            phone += inputNumber.substr(3, 3);
            phone += "-";
            phone += inputNumber.substr(6);
        } else {
            phone += inputNumber.substr(0, 3);
            phone += "-";
            phone += inputNumber.substr(3, 4);
            phone += "-";
            phone += inputNumber.substr(7);
        }
        e.target.value = phone;
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 18 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 18,
                    offset: 8
                },
                sm: {
                    span: 18,
                    offset: 8
                }
            }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{width: "500px"}}>
                <Form.Item label="이메일">
                    {getFieldDecorator("email", {
                        rules: [
                            {
                                type: "email",
                                message: "올바른 이메일주소를 입력해주세요."
                            },
                            {
                                required: true,
                                message: "이메일 주소를 입력해주세요."
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item label="비밀번호" hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "비밀번호를 입력해주세요."
                            },
                            {
                                validator: this.validateToNextPassword
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
                <Form.Item label="비밀번호확인" hasFeedback>
                    {getFieldDecorator("confirm", {
                        rules: [
                            {
                                required: true,
                                message: "비밀번호를 입력해주세요."
                            },
                            {
                                validator: this.compareToFirstPassword
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
                            onBlur={this.props.handleConfirmBlur}
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item label="휴대폰번호">
                    {getFieldDecorator("ctn", {
                        rules: [
                            {
                                required: true,
                                message: "휴대폰 번호를 입력해주세요."
                            }
                        ]
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            onChange={this.handlePhoneNumber}
                            maxLength={13}
                            style={{ width: "100%" }}
                            placeholder="Phone"
                        />
                    )}
                </Form.Item>
                {/* <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator("agreement", {
                        valuePropName: "checked"
                    })(
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    )}
                </Form.Item> */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({ name: "register" })(RegisterForm);

export default Register;
