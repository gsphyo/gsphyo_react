import React, { Component } from "react";
import {Layout} from 'antd';

import Navigation from '../components/Navigation';

const {Content, Footer} = Layout;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            userInfo: {}
        };
    }
    successLogin = data => {
        this.setState({ isLogin: true, userInfo: data });
    };
    successLogout = () => {
        this.setState({ isLogin: false, userInfo: [] });
    };
    render() {
        return (
            <Layout>
                <Navigation
                    isLogin={this.state.isLogin}
                    userInfo={this.state.userInfo}
                    successLogout={this.successLogout}
                    successLogin={this.successLogin}
                />
                <Content>
                    <h1>Main</h1>
                    <h2>Name: {this.state.userInfo.name}</h2>
                    <h2>Email: {this.state.userInfo.email}</h2>
                    <h2>Phone: {this.state.userInfo.phone}</h2>
                </Content>
                <Footer>Cloud Engineering Team</Footer>
            </Layout>
        );
    }
}

export default Main;
