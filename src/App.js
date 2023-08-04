import { useCallback, useReducer, useRef } from 'react';

import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
// import TestComp from './component/TestComp';

function reducer( state, action ) {
  // 상태 변화 코드
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE": {
      return state.map((it)=>
        it.id === action.targetId ?
        {
          ...it, isDone: !it.isDone,
        }
        : it
      );
    }
    case "DELETE" : {
      // action.type이 DELETE일때 수행할 상태변화코드, 
      // filter메서드로 id와 targetId가 일치하는 할 일 아이템만 제외한 할 일 배열을 생성해 반환
      return state.filter((it)=>it.id!==action.targetId);
    }

    default:
      return state;
  }
}

const mockToDo = [
  {
    id: 0,
    isDone: false,
    content: "React Study",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "Spring webflux",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "AWS",
    createDate: new Date().getTime(),
  },

];

function App() {
  const [todo, dispatch] = useReducer(reducer, mockToDo);
  // Ref객체는 리액트에서 주로 돔을 조작할 때 사용, 컴포넌트의 변수로도 사용
  const idRef = useRef(3);

  // useState를 이용해 할 일 아이템의 상태를 관리할 State를 만듭니다. 
  // 함수 useState에서 인수로 빈 배열을 전달해 State 변수 todo의 기본값을 빈 배열로 초기화합니다.
  // 함수 useState는 리액트 훅으로 react라이브러리에서 불러옵니다. 리액트에서는 보통 리스트 형태의 데이터를 보관할 때 배열을 이용
  // State변수 todo는 [할일관리] 앱에서 데이터를 저장하는 배열이면서 동시에 일종의 데이터베이스 역할을 수행합니다.

  // TodoEditor 컴포넌트에서 <추가>버튼 클릭 onCreate 함수
  // TodoEditor 컴포넌트에서 작성한 할일 데이터를 받아 매개변수 content에 저장
  // 이 데이터를 토대로 새 할 일 아이템 객체를 만들어 newItem에 저장
  const onCreate = (content) => {
    dispatch ({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createDate: new Date().getTime(),
      },
    });
    idRef.current +=1;
  };

  // 아이템 수정 함수
  // 할일 수정 함수, TodoList 컴포넌트에 Props로 전달
  const onUpdate = useCallback((targetId) => {//check box에 틱이 발생할 때 호출 하는 함수, 어떤 아이템에 틱이 발생했는지 알아야 함, 매개변수 targetId로 틱이 발생한 할 일 아이템의 id를 저장
    dispatch ({
      type:"UPDATE",
      targetId,
    });
  },[]);

  const onDelete = useCallback((targetId) => {
    dispatch ({
      type: "DELETE",
      targetId,
    });

  },[]);

  
  return (
    <div className="App">
      {/* <TestComp /> */}
      <Header />
      <TodoEditor onCreate={onCreate} />{/* onCreate는 사용자가 TodoEditor컴포넌트에서 추가 버튼을 클릭해야 호출되기 때문에 이 컴포넌트에 Props로 전달해야 한다.*/}
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />{/* 배열 todo를 TodoList 컴포넌트에 Props로 함수 onUpdate를 전달합니다. 배열데이터 렌더링 map 메서드 이용 */}
    </div>
  );
}

export default App;
