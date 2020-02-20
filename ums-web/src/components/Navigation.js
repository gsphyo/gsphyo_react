import React from "react";
import { Layout, Button, Row, Col } from "antd";

import '../style/Navigation.css';

const { Header } = Layout;

function Navigation({ isLogin, renderStatus, successLogout, setRenderStatus }) {
    function handleClickLogin(e) {
        e.preventDefault();
        setRenderStatus("login");
    }

    function handleClickRegister(e) {
        e.preventDefault();
        setRenderStatus("register");
    }

    let renderHeader;

    if (renderStatus === "main") {
        renderHeader = (
            <Col span={6}>
                {!isLogin ? (
                    <Button onClick={handleClickLogin}>로그인</Button>
                ) : (
                    <Button onClick={successLogout}>로그아웃</Button>
                )}
            </Col>
        );
    } else if (renderStatus === "login") {
        renderHeader = (
            <Col span={6}>
                <Button onClick={handleClickRegister}>회원가입</Button>
            </Col>
        );
    } else if (renderStatus === "register") {
        renderHeader = (
            <Col span={6}>
                <Button onClick={handleClickLogin}>로그인</Button>
            </Col>
        );
    }

    return (
        <Layout>
            <Header style={{background: "#fff"}}>
                <Row>
                    <Col span={18}>
                        <h1>UMS</h1>
                    </Col>
                    {renderHeader}
                </Row>
            </Header>
        </Layout>
    );
}

export default Navigation;
