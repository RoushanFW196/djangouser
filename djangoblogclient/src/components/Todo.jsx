import React, { useState } from "react";

const TodoForm = () => {
  const [todos, setTodos] = useState({
    todo_name: "",
    todo_type: "",
    todo_p: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTodos({ ...todos, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("todos", todos);


     fetch("")



  };
















  return (
    <div className="todo-form-container">
      <form className="todo-form" onSubmit={(e)=>handlesubmit(e)}>
        <input
          type="text"
          placeholder="Enter your todo..."
          className="todo-input"
          name="todo_name"
          onChange={handlechange}
        />

        <select name="todo_p" onChange={handlechange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select name="todo_type" onChange={handlechange}>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
        </select>

        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
