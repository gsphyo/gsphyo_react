import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";

import LoginForm from "./LoginForm";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLogin: false
        };
    }

    componentDidMount = () => {
        
    };
    userInfo = data => {
        console.log(data.email);
    };
    render() {
        return (
            <HashRouter>
                {/* <ProtectedRoute path="/" exact={true} component={LoginForm}/> */}
                <Route path="/" exact={true} component={LoginForm} />
                {/* <Route path="/login" exact={true} component={LoginForm} /> */}
                {/* <Route path="/movie/:id" exact={true} component={Detail} /> */}
            </HashRouter>
            // <LoginForm onCreate={this.userInfo}/>
        );
    }
}

export default Main;
