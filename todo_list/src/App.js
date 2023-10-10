import React, {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault(); // Prevents the default form submission behavior
  
    let todo = document.getElementById('todoAdd').value; // Retrieves the value of the input field with the id 'todoAdd' and assigns it to the variable 'todo'
  
    const newTodo = {
      id: new Date().getTime(), // Generates a unique ID based on the current timestamp
      text: todo.trim(), // Trims any leading or trailing whitespace from the 'todo' value and assigns it to the 'text' property of 'newTodo'
      completed: false, // Sets the 'completed' property of 'newTodo' to 'false'
    };
  
    if (newTodo.text.length > 0) { // Checks if the trimmed 'todo' value has a length greater than 0
      setTodos([...todos].concat(newTodo)); // Adds the 'newTodo' object to the 'todos' array by creating a new array using the spread operator and the 'concat' method
    } else {
      alert("Enter Valid Task"); // Displays an alert if the trimmed 'todo' value is empty or contains only whitespace
    }
  
    document.getElementById('todoAdd').value = ""; // Clears the input field with the id 'todoAdd'
  }
  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }
  
return(
    <div id="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id = 'todoAdd'
      />
      <button type="submit">Add Todo</button>
    </form>
  {todos.map((todo) => (

    <div key={todo.id} className="todo">
      <div className="todo-text">
        {/* Add checkbox for toggle complete */}
        <input
          type="checkbox"
          id="completed"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {/* if it is edit mode, display input box, else display text */}
        {todo.id === todoEditing ?
          (<input
            type="text"
            id = {todo.id}
            defaultValue={todo.text}
          />) :
          (<div>{todo.text}</div>)
        }
      </div>
      <div className="todo-actions">
        {/* if it is edit mode, allow submit edit, else allow edit */}
        {todo.id === todoEditing ?
        (
          <button onClick={() => submitEdits(todo)}>Submit Edits</button>
        ) :
        (
          <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
        )}

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
       </div>
    </div>
  ))}
  </div>
);
};
export default App;
