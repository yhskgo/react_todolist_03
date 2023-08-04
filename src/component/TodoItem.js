import React from "react";
import "./TodoItem.css";

const TodoItem = ({ id, content, isDone, createDate, onUpdate, onDelete }) => { // Props를 구조 분해 할당
    console.log(`${id} TodoItem updated...`)
    const onChangeCheckbox = () => {
        onUpdate(id);
    };
    const onClickDelete = () => {
        onDelete(id);
    }
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} 
                checked={isDone} type="checkbox"></input> {/* 체크박스의 입력 폼의 체크 여부를 isDone으로 설정 */}
            </div>
            <div className="title_col">{content}</div> {/* 할일을 페이지에 표시하기 위해 content를 렌더링 */}
            <div className="date_col">{new Date(createDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete}>Delete</button>
            </div>
        </div>
    );
};
export default React.memo( TodoItem );