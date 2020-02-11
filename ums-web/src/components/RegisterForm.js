import React, {Component} from 'react';
import axios from 'axios';

class RegisterForm extends Component{
    // constructor(props){
    //     super(props);
    // }

    handleRegister = async () => {
        console.log(
            'Register'
        );
        await axios
            .post("http://localhost:3001/Register", {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(resp => {
                // this.props.onLoginCheck(resp.data);
            })
            .catch(err => {
                console.log("err : " + err.response.data);
            });
        // console.log(data);
    }
    render(){
        return (
            <div>
                <h1>Register</h1>
                <button onClick={this.props.handleLogIn}>로그인</button>
                <button onClick={this.handleRegister}>회원가입</button>

            </div>
        )
    }
}

export default RegisterForm;