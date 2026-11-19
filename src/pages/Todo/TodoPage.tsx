import styled from "styled-components";
import { Main } from "../../styles/Styles.tsx";
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

const Title = styled.h1`
    font-size: 1.8rem;
    color: #333333;
    margin-bottom: 20px;
    text-align: center;
`;

const TodoForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const TodoInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    font-size: 1rem;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
        border-color: #6366f1;
    }
`;

const AddTodoBtn = styled.button`
    padding: 12px 20px;
    background-color: #6366f1;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #4f46e5;
}
`;

const TodoDivider = styled.hr`
    border: none;
    height: 1px;
    background-color: #eaeaea;
    margin: 20px 0;
`;

const TodoUl = styled.ul`
    list-style: none;
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
            <Title>My To_Do ({todoList.length})</Title>
            <TodoForm onSubmit={handleSubmit}>
                <TodoInput
                    type={"text"}
                    placeholder={"Write your to do ..."}
                    onChange={handleOnChange}
                    value={todoValue}
                />
                <AddTodoBtn type="submit">Add To Do</AddTodoBtn>
            </TodoForm>
            <TodoDivider />
            <TodoUl>
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
            </TodoUl>
        </TodoContainer>
    );
}

export default TodoPage;
