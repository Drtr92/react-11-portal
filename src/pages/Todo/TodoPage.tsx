import styled from 'styled-components';
import {Main} from "../../styles/Styles.tsx";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

type Todo = {
    text: string;
    completed: boolean;
};

const TodoContainer = styled.div`
    max-width: 480px;
    margin: 80px auto;
    padding: 30px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    ${Main};
`;

function TodoPage() {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoValue, setTodoValue] = useState<string>("");

    const handleOnChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setTodoValue(event.target.value);
    };

    // SubmitEvent는 javascript엔진에 내장된, 이름이 같은 타입이 존재하기 때문 => 우리가 원하는건 내장 타입이 아님
    // 우리가 원하는건, React 패키지에 있는 SubmitEvent 타입이 필요하고, 얘는 직접 import 해줘야 함     == 1번 방식
    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newText = todoValue.trim();
        if (newText === "") {
            return;
        }

        setTodoList([...todoList, { text: newText, completed: false }]);
        setTodoValue("");
    };

    const handleDeleteTodo = (target: number) => {
        const result = todoList.filter((_, index) => {
            return target !== index;
        });
        setTodoList(result);
    };

    const handleToggleTodo = (index: number) => {
        const newTodoList = todoList.map((item, i) => {
            if (i !== index) {
                return item;
            }
            return { ...item, completed: !item.completed };
        });
        setTodoList(newTodoList);
    };

    return (
        <TodoContainer>
            <h1>My To_Do ({todoList.length})</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type={"text"}
                    placeholder={"Write your to do ..."}
                    onChange={handleOnChange}
                    value={todoValue}
                />
                <button type="submit">Add To Do</button>
            </form>
            <hr />
            <ul>
                {todoList.map((item, index) => (
                    <li key={index}>
                        <span>{item.text}</span>
                        <button
                            onClick={() => {
                                // 지금 현재의 completed 값을 반대로 저장
                                return handleToggleTodo(index);
                            }}>
                            {item.completed ? "❤️" : "🤍"}
                        </button>

                        <button
                            onClick={() => {
                                return handleDeleteTodo(index);
                            }}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </TodoContainer>
    );
}

export default TodoPage;