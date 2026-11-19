import styled from "styled-components";
import { GlobalInput, Main } from "../styles/Styles.tsx";
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

const TodoLi = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f9fafb;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: backgound-color 0.2s;

    &:hover {
        background-color: #f3f4f6;
    }
`;

const TodoText = styled.span<{ $completed: boolean }>`
    flex: 1;
    font-size: 1rem;
    word-break: break-all;
    margin-right: 10px;
    color: ${props => (props.$completed ? "#9ca3af" : "#1f2937")};
    text-decoration: ${props => (props.$completed ? "line-through" : "none")};
`;

const TodoActionBttn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
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
        <Main>
            <TodoContainer>
                <Title>My To_Do ({todoList.length})</Title>
                <TodoForm onSubmit={handleSubmit}>
                    <GlobalInput
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
                        <TodoLi key={index}>
                            <TodoText $completed={item.completed}>{item.text}</TodoText>
                            <TodoActionBttn
                                onClick={() => {
                                    // 지금 현재의 completed 값을 반대로 저장
                                    return handleToggleTodo(index);
                                }}>
                                {item.completed ? "❤️" : "🤍"}
                            </TodoActionBttn>

                            <TodoActionBttn
                                onClick={() => {
                                    return handleDeleteTodo(index);
                                }}>
                                ❌
                            </TodoActionBttn>
                        </TodoLi>
                    ))}
                </TodoUl>
            </TodoContainer>
        </Main>
    );
}

export default TodoPage;
