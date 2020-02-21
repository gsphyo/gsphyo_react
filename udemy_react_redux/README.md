# Udemy 모던 리액트와 리덕스

* Github
    * [https://github.com/StephenGrider/ReduxCasts](https://github.com/StephenGrider/ReduxCasts)
* webdemo.balsamiq.com

## ReduxSimpleStarter

* github clone
    * [https://github.com/StephenGrider/ReduxSimpleStart](https://github.com/StephenGrider/ReduxSimpleStart)
* cd ReduxSimpleStarter
* npm install
* npm start
    * localhost:8080

* JSX
    * JS를 HTML로 변환
    * JS안에 있는 HTML 코드를 DOM에 추가
* class component
    * 내부에 정보를 저장하고 싶을 때 사용
    * 시작은 functional component로 시작해서 기능을 추가해야할 경우 class component로 리팩토링
* onChange={this.onInputChange}
    * onInputChange = (event) => {}
        * event.target.value로 input 값을 추출할 수 있음
    * 화살표 함수가 아닌 일반 함수는 undefined 에러가 발생함
        * 화살표 함수는 자동 bind
        * 일반 함수는 함수 호출할 때 bind(this) 입력
            * this.onInputChange.bind(this)
* state
    * state를 사용하려면 class component를 사용
    * state를 변경하기 위해선 setState 함수 사용
    * state를 변경하면 페이지 리렌더링

* Redux
    * React state 컨테이너
    * reducers는 react의 state를 반환함
    * 
    * Container
        * Redux 스테이트에 접근하는 컴포넌트
    * Action
        * container에서 이벤트가 발생하면 action creator를 생성
        * action creator는 action을 모든 reducer에게 전달
        * reducer는 action.type에 따라서 state를 변경
        * state가 변경되면 container 리렌더링