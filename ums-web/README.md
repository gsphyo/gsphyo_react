# User Management System(UMS) Web Page

## 구성
```
-public
-src
    |-components
    |   |-LoginForm.js
    |   |-Main.js
    |-App.js
    |-index.js
```

## 기능

### Home

1. Home에 접속했을 때, 로그인 여부 확인
2. 로그인되어있지 않으면 Login 페이지로 이동
3. 로그인 되어있으면 정보 노출

### Sign in

1. 이메일, 패스워드 입력
2. 로그인
    1. 성공
        1. Home으로 이동
    2. 실패
        1. 이메일이 다른지, 패스워드가 다른지 바로 표시
3. 회원가입
    1. Sign up으로 이동
4. 아이디 찾기
    1. 아이디 찾기로 이동
5. 패스워드 찾기
    1. 패스워드 찾기로 이동

### Sign up

1. 회원가입 정보 필요
2. 이메일, 패스워드 길이 즉각 확인
3. 회원가입하면 Login 페이지로 이동

## 날짜별 개발 내용

### 2020.02.05
- Dummy server 구현
    - ums-dummy 확인
- LoginForm.js
    - Login 양식 구현
    ```js
    import React from "react";
    import axios from "axios";

    class LoginForm extends React.Component {
        state = {
            email: "",
            password: ""
        };
        render() {
            return (
                <div>
                    <h1>Login</h1>
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

    ```
    - input 내용 변경 체크
    ```jsx
        handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    ```
    - input 정보 server로 전송
    ```jsx
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
            })
            .catch(err => {
                // console.log("err : " + err.response.data);
            });
        // console.log(data);
    };
    ```
- Main.js
    - react-router-dom의 HashRouter, Route사용
    ```js
    import { HashRouter, Route } from "react-router-dom";
    <HashRouter>
        <Route path="/" exact={true} component={LoginForm} />
    </HashRouter>
    ```
