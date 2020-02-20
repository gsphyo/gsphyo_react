import React, {Component} from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
// import Login from "./routes/Login";
// import LoginControl from "./components/LoginControl";

import "./style/App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            userInfo: []
        };
    }

    successLogin = data => {
        // console.log(`successLogin : ${data.email}`);
        this.setState({ isLogin: true, userInfo: data });
        // console.log(`state: ${this.state.userInfo}`);
    };
    
    successLogout = () => {
        this.setState({ isLogin: false, userInfo: [] });
    };

    render(){   
        return (
            <Main
                isLogin={this.state.isLogin}
                userInfo={this.state.userInfo}
                successLogin={this.successLogin}
                successLogout={this.successLogout}
            />
        );
    }
    
    
}

export default App;
