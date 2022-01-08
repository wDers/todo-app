import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { BsTrash } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";

function Todo({ todos, completeTodo, removeTodo, editTodo, handleCheckbox }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitEdit = (value) => {
    editTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitEdit} />;
  }

  return todos.map((todo, index) => (
    <div className="container w-full md:w-10/12 lg:w-8/12 xl:w-5/12 px-5 relative bottom-5 md:bottom-28 lg:bottom-36 xl:bottom-48 2xl:bottom-60">
      <div
        className={
          !todo.isComplete
            ? "flex items-center justify-between w-full min-h-[2.5rem] py-2 rounded-md mb-3 bg-[#fff] text-black shadow-md relative"
            : "flex items-center justify-between w-full min-h-[2.5rem] py-2 rounded-md mb-3 bg-[#fff] text-black shadow-md relative line-through"
        }
        key={index}
      >
        <div className="flex items-center ml-3">
          <input
            type="checkbox"
            className="accent-indigo-600 focus:outline-none cursor-pointer min-w-[15px] min-h-[15px]"
            onClick={() => completeTodo(todo.id)}
            checked={todo.isChecked ? todo.isChecked : false}
            onChange={() => handleCheckbox(todo.id)}
          />
          <div
            className="mx-3 break-all leading-4"
            key={todo.id}
            onClick={() => completeTodo(todo.id)}
            onClickCapture={() => handleCheckbox(todo.id)}
          >
            {todo.text}
          </div>
        </div>
        <div className="flex gap-2 text-lg text-indigo-600 mr-3">
          {!todo.isComplete ? (
            <VscEdit
              className="cursor-pointer"
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
            />
          ) : null}
          <BsTrash
            className="cursor-pointer"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
      </div>
    </div>
  ));
}

export default Todo;
