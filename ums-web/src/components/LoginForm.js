import React, { Component } from "react";
import axios from "axios";

import '../style/loginForm.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    LoginCheck = async () => {
        console.log(
            `Login Check email: ${this.state.email}, password: ${this.state.password}`
        );
        await axios
            .post("http://localhost:3001/login", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(resp => {
                this.props.onLoginCheck(resp.data);
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
        // console.log(data);
    };

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1>로그인</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={{ span: 6 }}>
                        <Form>
                            <Form.Group controld="formBasicEmail">
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="이메일 주소를 입력하세요."
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    name="email"
                                />
                            </Form.Group>
                            <Form.Group controld="formBasicPassword">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호를 입력하세요."
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                />
                            </Form.Group>
                            <ButtonToolbar>
                                <Button
                                    className="login-btn"
                                    variant="primary"
                                    type="submit"
                                    onClick={this.LoginCheck}
                                >
                                    로그인
                                </Button>
                                <Button
                                    className="register-btn"
                                    variant="primary"
                                    onClick={this.props.handleSignUp}
                                >
                                    회원가입
                                </Button>
                            </ButtonToolbar>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginForm;
