import React from "react";

export const TodoItem = ({ todo, toggleTodo }) => {
  const { id, task, completed } = todo;
  // console.log(todo);
  const handleTodoClick = () => {
    toggleTodo(id);
  };

  return (
    <li className={completed ? "completed" : ""}>
      <input type="checkbox" onChange={handleTodoClick} checked={completed} />{" "}
      {task}
    </li>
  );
};
