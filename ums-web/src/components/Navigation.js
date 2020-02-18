import React from "react";
import { Layout, Button, Row, Col } from "antd";
// import { Link } from "react-router-dom";

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
                    <Button onClick={handleClickLogin}>Login</Button>
                ) : (
                    <Button onClick={successLogout}>Logout</Button>
                )}
            </Col>
        );
    } else if (renderStatus === "login") {
        renderHeader = (
            <Col span={6}>
                <Button onClick={handleClickRegister}>Register</Button>
            </Col>
        );
    } else if (renderStatus === "register") {
        renderHeader = (
            <Col span={6}>
                <Button onClick={handleClickLogin}>Login</Button>
            </Col>
        );
    }

    return (
        <Layout>
            <Header>
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
