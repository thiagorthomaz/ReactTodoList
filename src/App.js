import TodoList from "./TodoList";
import { useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos);
  }, [])

  //Salva a lista de todos, sempre que a lista de TODOS é alterada.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return;

    setTodos(prevTodos => {
      return [...prevTodos, {id : uuid(), name:name, completed:false}]
    })

    todoNameRef.current.value = null;
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  function toggleTodo(id){
    console.log(id)
    const newTodos = [...todos];//Cria uma cópia da lista para modificar.
    const todo = newTodos.find(todo => todo.id === id);
    if(todo) todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  return (
    <>
    <TodoList todoList={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </>
  );
}

export default App;
