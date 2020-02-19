import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";

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
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                this.handleRegister(values);
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
        this.handlePasswordPattern(value, callback);
        callback();
    };

    handlePasswordPattern = (value, callback) => {
        /*
            - ID가 비밀번호에 포함되는가
            - 대소문자, 숫자, 특수문자 사용
            - 동일 문자/숫자 4자리 이상 입력 불가
            - 연속된 숫자 4자리 이상 불가
            - 공백 입력 불가 처리 : handleInputPassword
        */
        const { form } = this.props;
        const checkNumberString = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,20}$/.test(
            value
        ); //문자, 숫자
        const checkStringSpe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{10,20}$/.test(
            value
        ); //문자, 특수문자 ^a-zA-Z0-9
        const checkNumSpe = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{10,20}$/.test(
            value
        ); //특수문자, 숫자
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

    // 내일 테스트
    // function _NoConsecutive(param) {
    //     var result = false;
    //     var chars =  /(\d){3,}/;
    //         var chars2 =  /(\w){3,}/;
    
    
    //     if(param.search(chars) || param.search(chars2)) {
    //         result =  true;
    //     }
    // return result;
    // }

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
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                    })(<Input />)}
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
                            maxLength={20}
                            onChange={this.handleInputPassword}
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
                            maxLength={20}
                            onBlur={this.handleConfirmBlur}
                        />
                    )}
                </Form.Item>
                <Form.Item label="휴대폰번호">
                    {getFieldDecorator("phone", {
                        rules: [
                            {
                                required: true,
                                message: "휴대폰 번호를 입력해주세요."
                            }
                        ]
                    })(
                        <Input
                            onChange={this.handlePhoneNumber}
                            maxLength={13}
                            style={{ width: "100%" }}
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
