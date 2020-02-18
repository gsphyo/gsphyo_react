import React, { Component } from "react";
import { Layout } from "antd";

import Navigation from "./Navigation";
import Login from "./Login";
import Register from './Register';

const { Content, Footer } = Layout;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderStatus: "register" //main, login, register
        };
    }

    setRenderStatus = status => {
        this.setState({ renderStatus: status });
    };

    render() {
        const renderStatus = this.state.renderStatus;
        let renderContent;

        if (renderStatus === "main") {
            renderContent = (
                <Layout>
                    <Content>
                        <h1>Main</h1>
                        <h2>Name: {this.props.userInfo.name}</h2>
                        <h2>Email: {this.props.userInfo.email}</h2>
                        <h2>Phone: {this.props.userInfo.phone}</h2>
                    </Content>
                    <Footer>Cloud Engineering Team</Footer>
                </Layout>
            );
        }
        else if(renderStatus === "login"){
            renderContent = <Login successLogin={this.props.successLogin} setRenderStatus={this.setRenderStatus} />
        }
        else if(renderStatus === "register"){
            renderContent = <Register />
        }

        return (
            <Layout>
                <Navigation
                    isLogin={this.props.isLogin}
                    renderStatus={this.state.renderStatus}
                    successLogout={this.props.successLogout}
                    setRenderStatus={this.setRenderStatus}
                />
                {renderContent}
            </Layout>
        );
    }
}

export default Main;
