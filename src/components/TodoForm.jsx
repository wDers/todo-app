import React, { useState, useRef } from "react";
import { VscEdit } from "react-icons/vsc";

function TodoForm({ onSubmit, count, setCount, edit, removeAllTodo }) {
  const [input, setInput] = useState(edit ? edit.value : "");

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 9999),
      text: input,
    });

    setInput("");
  };

  const searchInput = useRef(null);

  function handleFocus() {
    searchInput.current.focus();
  }

  return (
    <form
      className="px-5 container w-full md:w-10/12 lg:w-8/12 xl:w-5/12 z-10"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {edit ? (
        <>
          <div className="relative lg:bottom-20 xl:bottom-32">
            <input
              className="w-full h-10 pl-3 pr-8 text-black placeholder-gray-600 border rounded-md focus:outline-none"
              placeholder="Todo szerkesztése"
              type="text"
              value={input}
              onChange={handleChange}
              autoFocus
              ref={searchInput}
            />
            <button className="absolute inset-y-0 right-0 flex items-center px-4 text-xl font-bold text-white bg-indigo-600 rounded-r-md focus:outline-none">
              <VscEdit />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="relative md:top-8 lg:top-12 xl:top-16 2xl:top-20">
            <div className="relative">
              <input
                className="w-full h-10 pl-3 pr-8 text-black placeholder-gray-600 border rounded-md focus:outline-none"
                placeholder="Todo hozzáadása"
                value={input}
                type="text"
                onChange={handleChange}
                autoFocus
                ref={searchInput}
              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4  text-xl font-bold text-white bg-indigo-600 rounded-r-md focus:outline-none"
                onClick={input.length > 0 ? () => setCount(count + 1) : null}
                onClickCapture={handleFocus}
              >
                +
              </button>
            </div>
            <p className="relative top-4 xl:text-xl xl:top-10">
              {count < 1 || count === null ? "Nincs" : `Vissza van ${count}`}{" "}
              tennivaló.
            </p>
            <div className="relative top-5 w-full flex justify-end xl:top-20">
              <button
                className="font-semibold select-none xl:text-xl"
                onClick={() => removeAllTodo()}
              >
                Lista törlése
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
}

export default TodoForm;
