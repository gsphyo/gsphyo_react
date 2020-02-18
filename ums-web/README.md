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

### 2020. 02. 06

#### 할일
1. 상태 값에 따라서 페이지 라우팅
2. 로그인 처리

#### 정리

- Props
    - 부모 컴포넌트가 자식 컴포넌트에게 주는 값
    - 자식 컴포넌트에서 props을 받아오기만하고, 직접 수정할 순 없음
    - 
- State
    - 동적 데이터를 다룰 때 사용
    - 값을 변경할 때는 무조건 setState를 이용해야함
    - 
- `react-router-dom`의 Route에서 props 넘기기
    ```js
    <Route
        path="/"
        exact={true}
        render={props => (
            <Main
                name={this.state.email}
                pwd={this.state.password}
            />
        )}
    />
    ```

### 2020. 02. 07.

#### 할 일
- Redux 공부
- React + Redux 로그인 구현
    - [https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example](https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example)

### 2020. 02. 17.
다시 시작

#### To-Do
- antd 적용
- Login 기능 개발

### 2020. 02. 18.

#### To-Do
- Login 기능 개발
- Register 기능 개발