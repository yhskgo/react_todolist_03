import { useReducer } from "react";

// reducer 두 개 매개변수 첫 번째 state에는 현재 State값 저장
// 두 번째 매개변수 action에는 dispatch 함수를 호출하면서 인수로 전달한 action 객체가 저장 됨
function reducer(state, action) {
    switch(action.type) {
        case "INCREASE":
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        case "INIT":
            return 0;
        default:
            return state;
    }

}// 새로운 함수 reducer를 컴포넌트 밖에 생성

function TestComp() {
    // useReducer를 호출하고 2개의 인수를 전달, 첫 번째 인수는 함수 reducer이고 두 번째 인수는 State의 초기값
    // useReducer도 useState처럼 배열을 반환하는데 배열의 첫 번째 요소 count는 State변수이고, 두 번째 요소는 상태 변화를 촉발하는 함수 dispatch입니다.
    const [count, dispatch] = useReducer(reducer, 0);

    return (
        <div>
            <h4>Test Component</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <div>
                <button onClick={()=>dispatch({ type: "INCREASE", data: 1 })}>
                    +
                </button>
                <button onClick={()=>dispatch({ type: "DECREASE", data: 1})}>
                    -
                </button>
                <button onClick={()=>dispatch({ type: "INIT",})}>
                    Initialize as 0
                </button>
            </div>
        </div>
    );
}
export default TestComp;