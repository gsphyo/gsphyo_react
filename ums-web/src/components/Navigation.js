import React from "react";
import { Layout, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

function Navigation({ isLogin, userInfo, successLogout, successLogin }) {
    return (
        <Layout>
            <Header>
                <Row>
                    <Col span={18}>
                        <h1>UMS</h1>
                    </Col>
                    <Col span={6}>
                        {!isLogin ? (
                            <div>
                                <Link
                                    to={{
                                        pathname: `/login`,
                                        state: {
                                            isLogin,
                                            userInfo,
                                            successLogin
                                        }
                                    }}
                                >
                                    <Button>Login</Button>
                                </Link>
                                <Link>
                                    <Button>Join</Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {/* <Link> */}
                                <Button onClick={successLogout}>Logout</Button>
                                {/* </Link> */}
                            </div>
                        )}
                    </Col>
                </Row>
            </Header>
        </Layout>
    );
}

export default Navigation;
