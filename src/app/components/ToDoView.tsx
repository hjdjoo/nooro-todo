"use client"

import { useState } from "react";
import { ToDo } from "@/_types/client-types"
import TodoItem from "./TodoItem";

import { Document } from "@/_icons/icons";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!

interface TodoViewProps {
  todos: ToDo[]
}

export default function TodoView(props: TodoViewProps) {

  const { todos } = props;

  const [todoList, setTodoList] = useState<ToDo[]>(todos);

  const documentIcon = Document();

  let todosComplete = 0;

  // manage completion status; set state and update db.
  async function toggleComplete(item: ToDo, status: boolean) {
    const currTodos = [...todoList];

    try {

      const updatedTodos = todoList.map(todo => {
        return todo.id === item.id ? { ...todo, complete: !todo.complete } : todo
      })

      setTodoList(updatedTodos);

      console.log("item completed? ", status)

      const req = {
        id: item.id,
        complete: !status
      }

      const res = await fetch(`${SERVER_URL}/api/todo`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
      })

      if (!res.ok) {
        throw new Error("Something went wrong while updating item.")
      }

      const data: ToDo = await res.json();

      console.log(data);


    } catch (e) {
      console.error("Error while updating todo item: ", e);
      setTodoList(currTodos);
    }

  }

  // remove item from database and sync state
  async function deleteItem(item: ToDo) {
    const currTodos = [...todoList];

    try {

      const updatedTodos = todoList.filter(todo => {
        return todo.id !== item.id
      })

      setTodoList(updatedTodos);

      const res = await fetch(`http://localhost:5000/api/todo/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!res.ok) {
        throw new Error(`Something went wrong while deleting item from DB: ${res.status}`)
      }

      const data = await res.json();

      console.log(data);

    } catch (e) {
      console.error(e);
      setTodoList(currTodos);
    }

  }

  // render default component if todo list is empty
  if (!todoList.length) {
    return (
      <div id="default-todo-items"
        className={`flex flex-col pt-10 items-center text-font-secondary`}>
        <div id="add-todo-icon"
          className={`h-24 w-24 mb-2`}>
          {documentIcon}
        </div>
        <p className="font-extrabold mb-2">
          {"You don't have any tasks registered yet."}
        </p>
        <p>{"Create tasks and organize your to-do items"}</p>
      </div>
    )
  }

  todoList.forEach(item => {

    if (item.complete) {
      todosComplete += 1;
    }

  })

  const todoItems = todoList.map((item) => {

    if (!item.complete) {
      return (
        <TodoItem
          key={`todo-item-${item.id}`}
          item={item}
          deleteItem={deleteItem}
          updateItem={toggleComplete}
        />
      )
    }
  })

  const completedItems = todoList.map((item) => {
    if (item.complete) {
      return (
        <TodoItem
          key={`completed-item-${item.id}`}
          item={item}
          deleteItem={deleteItem}
          updateItem={toggleComplete}
        />
      )
    }
  })


  return (
    <div id="todo-items-view"
      className="flex flex-col items-center justify-start border border-gray-500">
      <section id="todo-summary"
        className="w-full flex justify-between px-2 py-2">
        <div id="tasks-number"
          className={`flex items-center text-sm text-theme-primary-light font-extrabold`}>
          Tasks
          <div className={`flex items-center justify-center ml-1 h-[1.5rem] w-[1.5rem] bg-dark-secondary-light text-font-primary rounded-full text-xs`}>
            {todoList.length}
          </div>
        </div>
        <div id="tasks-completed"
          className={`flex items-center text-sm  text-theme-primary-light font-extrabold`}>
          Completed
          <div
            className={`flex items-center justify-center ml-1 h-[1.5rem] px-3 bg-dark-secondary-light text-font-primary rounded-full text-xs`}
          >
            {`${todosComplete} of ${todoList.length}`}
          </div>
        </div>
      </section>
      {todoItems}
      {completedItems}
    </div>
  )

}