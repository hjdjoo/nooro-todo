"use client"

import { useState } from "react";
import { ToDo } from "@/_types/client-types"
import TodoItem from "./TodoItem";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!

interface TodoViewProps {
  todos: ToDo[]
}

export default function TodoView(props: TodoViewProps) {

  const { todos } = props;

  const [todoList, setTodoList] = useState<ToDo[]>(todos);

  let todosComplete = 0;

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


  if (!todoList.length) {
    return (
      <div>
        <div>
          Icon
        </div>
        <h3>
          {"You don't have any tasks registered yet."}
        </h3>
        <p>Create tasks and organize your to-do items</p>
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
      className="flex flex-col items-center justify-start">
      <section id="todo-summary"
        className="w-full flex justify-between px-2">
        <div id="tasks-number"
          className={`flex text-sm`}>
          Tasks
          <div className={`ml-1`}>
            {todoList.length}
          </div>
        </div>
        <div id="tasks-completed"
          className={`flex text-sm`}>
          Completed
          <div
            className={`ml-1`}
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