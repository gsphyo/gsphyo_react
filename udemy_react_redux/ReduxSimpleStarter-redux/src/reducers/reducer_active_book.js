// state 요소는 어플리케이션의 state가 아님
// state는 reducer가 권한을 가지고 있음
export default function(state = null, action) {
  switch (action.type) {
    case "BOOK_SELECTED":
      // action의 object를 수정할 수 없음
      return action.payload;
  }
  // 상관없는 action이 dispatch되는 경우 현재 state를 반환
  return state;
}
