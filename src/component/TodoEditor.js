import { useRef, useState } from "react";
import "./TodoEditor.css";

// Props 객체를 구조 분해 할당 : onCreate 
const TodoEditor = ({onCreate}) => {
    // 입력 새 할일 데이터를 저장할 state 제작
    // 사용자가 입력폼에 입력한 데이터를 저장할 State변수 content를 생성
    const [content, setContent] = useState("");
    const inputRef = useRef();
    // 입력폼의 onChange 이벤트 핸들러 onChangeContent를 제작
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    //추가 버튼을 클릭하면 함수 onCreate를 호출하는 버튼 클릭 이벤트핸들러 생성
    const onSubmit = () => {
        if(!content) {
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }

    const onKeyDown = (e) => {
        if(e.keyCode===13) {//13 is Enter key.
            onSubmit();
        }
    };

    return (
        <div className="TodoEditor">
            <h4>New Todo write ✏️</h4>
            <div className="editor_wrapper">
                <input 
                ref={inputRef}
                value={content} // 입력폼의 value 속성으로 content값을 설정하고 
                onChange={onChangeContent} // 이벤트 핸들러로 onChangeContent를 설정
                onKeyDown={onKeyDown}
                placeholder="New Todo..."></input>
                <button onClick={onSubmit}>
                    ADD
                </button>
            </div>
        </div>
    )
};
export default TodoEditor;