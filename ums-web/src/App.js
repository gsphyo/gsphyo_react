import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
// import LoginControl from "./components/LoginControl";

import "./style/App.css";

function App() {
    return (
        <HashRouter>
            <Route path="/" exact={true} component={Main} />
            <Route path="/login" exact={true} component={Login} />
            {/* <Route path="/join" exact={true} component={Detail} /> */}
        </HashRouter>
    );
    // return this.state.isLogin ? (
    //     <Main
    //         userInfo={this.state.userInfo}
    //         onLogoutCheck={this.successLogout}
    //     />
    // ) : (
    //     // <LoginControl onLoginCheck={this.successLogin} />
    //     <Main
    //         userInfo={this.state.userInfo}
    //         onLogoutCheck={this.successLogout}
    //     />
    // );
}

export default App;
