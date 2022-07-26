import React, { useContext, useEffect, useState } from 'react'
import { CredentialsContext } from "./_app";
import { v4 as uuidv4 } from "uuid";
import Head from 'next/head'
import { useRouter } from 'next/router';
// function myFunction() {
//   router.replace("/index");
// }

// window.onload = function() {
//   var reloading = sessionStorage.getItem("reloading");
//   if (reloading) {
//       sessionStorage.removeItem("reloading");
//       myFunction();
//   }
// }

const usertodo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [Credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");
  const router = useRouter();
  const persist = (newTodos) => {
    fetch(`http://localhost:3001/usertodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Credentials.email}:${Credentials.pass}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => { });
  };
  useEffect(() => {
    fetch(`http://localhost:3001/usertodo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Credentials.email}:${Credentials.pass}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };
  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };
  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const Logout = ()=>{
    router.replace("/");
  }
  return (
    <div className="py-12 bg-white w-screen">
      {/* <h1>Hello {Credentials.usern}!</h1>
      <h4>Welcome To Your To do app</h4> */}
      <Head>
        <title>ToDo App</title>
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
        <button onClick = {Logout}
              type="submit"
              className="w-3/4 py-2 mt-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 justify-center sm:w-1/2 lg:w-1/4 mb-6"
            >
              Log Out
            </button>
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">ToDo App</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome {Credentials.usern}! To Your To Do App.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
            accusamus quisquam.
          </p>
          <form onSubmit={addTodo}>
            <input type="textarea" placeholder='Add Your Task'
              className='border-2 w-full mt-12 text-gray-700 max-w-2xl text-xl lg:mx-auto px-1 sm:px-2 lg:px-3 sm:w-3/4' id="Texta"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="w-3/4 py-2 mt-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 justify-center sm:w-1/2 lg:w-1/4 mb-6"
            >
              Add The Task
            </button>
          </form>
          <select value={filter} onChange={(e) => changeFilter(e.target.value)}
          className = "mb-4">
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>

          {getTodos().map((todo) => (
            <div key={todo.id}>
              <input
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
                type="checkbox"
              />
              <label>{todo.text}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default usertodo
