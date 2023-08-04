import { useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({todo, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const getSearchResult = () => {
        return search === ""
        ? todo
        : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    };

    // 할 일 분서그 추가한 할 일 아이템이 모두 몇 개인지 또 완료아이템과 미완료 아이템은 각각 몇 개인지 검색하여 렌더링
    // 현재 State변수 todo의 아이템 총개수를 totalCount, 완료아이템 개수 doneCount, 미완료아이템 개수 notDoneCount에 저장, 객체에 담아 리턴
    // useMemo 호출, 첫 번째 인수로 함수 analyzeTodo 전달, 두 번째 인수로 todo가 담긴 배열 전달
    // useMemo는 함수가 아닌 값을 반환, 함수 anlyzieTodo에는 값이 저장, 구조 분해 할당의 대상을 기존의 analyzeTodo()가 아닌 analyzeTodo로 변경해야 함

    const analyzeTodo = useMemo(() => {
        // console.log("Calling analyzeTodo()...");
        const totalCount = todo.length;
        const doneCount = todo.filter((it)=>it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todo]);

    // 함수 analyzeTodo를 호출하고 반환객체를 구조분해 할당
    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List ✅</h4>
            <div>
                <div>Total count: {totalCount}</div>
                <div>Done Todo Item: {doneCount}</div>
                <div>Not done Item: {notDoneCount}</div>
            </div>
            <input 
            value={search}
            onChange={onChangeSearch}
            className="searchbar" 
            placeholder="Enter the search text.">    
            </input>
            <div className="list_wrapper">
                {getSearchResult().map((it) => (
                    <TodoItem key={it.id} 
                    {...it} 
                    onUpdate={onUpdate}
                    onDelete={onDelete} /> //리스트의 각 컴포넌트에 key로 할 일 아이템의 id를 전달
                ))}
            </div>
        </div>
    );
};
export default TodoList;