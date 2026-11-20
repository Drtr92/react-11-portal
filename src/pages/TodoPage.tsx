import styled from "styled-components";
import { GlobalButton, GlobalInput, GlobalTitle, Main } from "../styles/Styles.tsx";
import { type ChangeEvent, type SubmitEvent, useState } from "react";

type Todo = {
    text: string;
    completed: boolean;
};

const TodoContainer = styled.div`
    max-width: 480px;
    margin: 40px auto;
    padding: 30px;
    background-color: transparent;
    border-radius: 16px;
`;

const TodoForm = styled.form`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const TodoDivider = styled.hr`
    border: none;
    height: 1px;
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 15%, transparent);
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
    background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 10%, transparent);
    border-radius: 8px;
    margin-bottom: 10px;
    transition: background-color 0.2s;

    &:hover {
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 30%, transparent);
    }
`;

const TodoText = styled.span<{ $completed: boolean }>`
    flex: 1;
    font-size: 1rem;
    word-break: break-all;
    margin-right: 10px;
    color: ${({ theme, $completed }) =>
        $completed ? `color-mix(in srgb, ${theme.color.text} 40%, transparent)` : theme.color.text};
    text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
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
        background-color: color-mix(in srgb, ${({ theme }) => theme.color.text} 10%, transparent);
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
                <GlobalTitle>To_Do ({todoList.length})</GlobalTitle>
                <TodoForm onSubmit={handleSubmit}>
                    <GlobalInput
                        type={"text"}
                        placeholder={"Write your to do ..."}
                        onChange={handleOnChange}
                        value={todoValue}
                    />
                    <GlobalButton type="submit">Add To Do</GlobalButton>
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
