import React from "react";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import "moment/locale/hu";

function TodoList(props) {
  const [todos, setTodos] = useLocalStorageState("todos", [
    {
      id: 0,
      text: "Kipróbálni a Todo Applikációt.",
      isComplete: false,
      isChecked: false,
    },
  ]);

  const [count, setCount] = useLocalStorageState("count", 1);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos, todo];

    setTodos(newTodos);
  };

  const editTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);

    todos.map((todo) => {
      if (todo.id === id) {
        if (todo.isComplete && todo.isChecked) {
          setCount(count);
        } else setCount(count - 1);
      }
    });
  };

  const removeAllTodo = () => {
    setTodos([]);
    setCount(0);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleCheckbox = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
        if (todo.isChecked) {
          setCount(count - 1);
        } else setCount(count + 1);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="h-screen min-w-min">
      <div className="flex flex-col items-center h-50 bg-[#6D63FF] py-8 md:h-25 ">
        <div className="text-center xl:relative xl:top-5">
          <h1 className="text-3xl font-semibold pb-2 px-5 select-none xl:text-5xl">
            Mai tennivalók
          </h1>
          <div className="text-lg font-medium pb-1 px-5 select-none lg:text-xl">
            <span>{moment().format("ll")}</span>
            <span className="capitalize"> {moment().format("dddd")}</span>
          </div>
        </div>
        <TodoForm
          onSubmit={addTodo}
          count={count}
          setCount={setCount}
          removeAllTodo={removeAllTodo}
        />
      </div>
      <svg
        className="relative bottom-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6D63FF"
          fillOpacity="1"
          d="M0,128L120,138.7C240,149,480,171,720,165.3C960,160,1200,128,1320,112L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
      <div className="flex flex-col items-center">
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
}

export default TodoList;
