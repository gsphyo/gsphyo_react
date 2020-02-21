import { FETCH_WEATHER } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      // state를 바로 변경하기 않고, 새로운 배열을 생성해서 반환
      // return state.concat([action.payload.data]);
      return [action.payload.data, ...state];
  }
  return state;
}
