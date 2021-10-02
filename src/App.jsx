import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

const KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();

  // To retrieve the local storage information
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // To save the tasks in the local storage
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoRef.current.value;
    if (task === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });
    todoRef.current.value = "";
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };
  return (
    <div className="container">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoRef} type="text" placeholder="New task..." />
      <button onClick={handleTodoAdd}>Add ➕</button>
      <button onClick={handleClearCompleted}>Delete 🗑</button>
      <p>{todos.filter((todo) => !todo.completed).length} pending task(s)!</p>
    </div>
  );
}
export default App;
