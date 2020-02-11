import React, { Component } from "react";

import Main from "./components/Main";
import LoginControl from "./components/LoginControl";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            userInfo: []
        };
    }
    successLogin = data => {
        this.setState({ isLogin: true, userInfo: data });
    };
    successLogout = () => {
        this.setState({ isLogin: false, userInfo: [] });
    };
    render() {
        return this.state.isLogin ? (
            <Main
                userInfo={this.state.userInfo}
                onLogoutCheck={this.successLogout}
            />
        ) : (
            <LoginControl onLoginCheck={this.successLogin} />
        );
    }
}

export default App;
