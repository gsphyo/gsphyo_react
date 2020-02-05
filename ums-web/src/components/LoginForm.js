import React from "react";
import axios from "axios";

class LoginForm extends React.Component {
    state = {
        email: "",
        password: ""
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    LoginCheck = async () => {
        console.log(
            `Login Check email: ${this.state.email}, password: ${this.state.password}`
        );
        await axios
            .post("http://localhost:3001/login", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    email: this.state.email,
                    password: this.state.password
                }
            })
            .then(resp => {
                console.log("success : " + resp.data);
                this.props.onCreate(this.state);
            })
            .catch(err => {
                // console.log("err : " + err.response.data);
            });
        // console.log(data);
    };
    render() {
        return (
            <div>
                <h1>Login</h1>
                {/* <input value={} type="text" placeholder="email" /> */}
                <input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="email"
                    name="email"
                />
                <input
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    placeholder="password"
                    name="password"
                />
                <button onClick={this.LoginCheck}>Login</button>
            </div>
        );
    }
}

export default LoginForm;
