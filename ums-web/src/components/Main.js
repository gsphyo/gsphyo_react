import React, { Component } from "react";


class Main extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onLogoutCheck}>로그아웃</button>
                <h1>Main</h1>
                <h2>Name: {this.props.userInfo.name}</h2>
                <h2>Email: {this.props.userInfo.email}</h2>
                <h2>Phone: {this.props.userInfo.phone}</h2>
            </div>
        );
    }
}

export default Main;
