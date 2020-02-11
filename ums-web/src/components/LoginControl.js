import React, { Component } from "react";

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// import Header from "./Header";

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUp: false,
        };
    }

    handleSignUp = () => {
        this.setState({ isSignUp: true });
    };

    handleLogIn = () => {
        this.setState({ isSignUp: false });
    };

    render() {
        return (
            <div>
                {!this.state.isSignUp ? (
                    <LoginForm
                        handleSignUp={this.handleSignUp}
                        onLoginCheck={this.props.onLoginCheck}
                    />
                ) : (
                    <RegisterForm handleLogIn={this.handleLogIn} />
                )}
            </div>
        );
    }
}

export default LoginControl;
