"use client"

import { ToDo } from "@/_types/client-types"
import { useState, ChangeEvent, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { defaultTodo } from "@/_const/defaultTodo";

import { BackIcon } from "@/_icons/icons";
import { AddIcon } from "@/_icons/icons";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL


export default function TaskPage() {

  // const todo = props.todo ? props.todo : defaultTodo
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const [newTodo, setNewTodo] = useState<ToDo>(defaultTodo)

  useEffect(() => {

    const { id } = params;

    async function getTaskById(id: string) {

      const res = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "GET"
      })

      if (!res.ok) {
        console.error("Something went wrong while fetching todo")
      }

      const data: ToDo = await res.json();

      setNewTodo(data);

    }

    if (id === "new") {
      return;
    }

    if (Number(id)) {
      getTaskById(id);
    }

  }, [params])

  const colorClasses: { [color: string]: string } = {
    red: "bg-todo-red",
    orange: "bg-todo-orange",
    yellow: "bg-todo-yellow",
    green: "bg-todo-green",
    blue: "bg-todo-blue",
    purple: "bg-todo-purple",
    pink: "bg-todo-pink",
    rose: "bg-todo-rose",
    beige: "bg-todo-beige"
  }

  const activeColorClasses: { [active: string]: string } = {
    active: "scale-110 border-4 border-white",
    inactive: ""
  }

  const backIcon = BackIcon();
  const addIcon = AddIcon();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;

    const updatedTodo = structuredClone(newTodo) as ToDo;

    updatedTodo[name] = value;

    setNewTodo(updatedTodo);

  }

  function selectColor(color: string) {

    const updatedTodo = structuredClone(newTodo);

    updatedTodo.color = color;

    setNewTodo(updatedTodo);

  }


  function handleBack() {
    setNewTodo(defaultTodo);
    router.push("/")
  }

  async function handleSubmit() {
    try {

      const req = {
        title: newTodo.title,
        color: newTodo.color,
        complete: newTodo.complete
      }

      switch (params.id) {
        case "new":

          const newRes = await fetch(`${SERVER_URL}/api/todo/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
          });

          if (!newRes.ok) {
            throw new Error("Something went wrong while adding new Todo item")
          }
          break;
        default:
          const updateRes = await fetch(`${SERVER_URL}/api/todo`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...req, id: Number(params.id) })
          });

          if (!updateRes.ok) {
            throw new Error("Something went wrong while updating Todo Item")
          };
      };

      router.push("/");

    } catch (e) {
      console.error(e);
      alert("item not added");
      setNewTodo(defaultTodo);
    }

  }

  const colorPickers = Object.keys(colorClasses).map((color) => {

    const active: string = (newTodo.color === color) ? "active" : "inactive"

    return (
      <div key={`select-${color}`} id={`select-${color}`}
        className={
          `${colorClasses[color]} 
          ${activeColorClasses[active]} 
          h-12 w-12 mx-2 my-2 rounded-full `}>
        <button className={`w-full h-full`} onClick={(e) => {
          e.preventDefault();
          selectColor(color)
        }}>
        </button>
      </div>
    )
  })

  return (
    <main id="taskpage-main"
      className="h-[80vh] w-screen flex flex-col items-center pt-12 bg-dark-secondary">
      <div id="add-edit-task-page"
        className={`flex flex-col items-center w-[60vw]`}>
        <button id="back-button"
          className={`self-start text-slate-200 mb-10 h-8 w-8`}
          onClick={(e) => {
            e.preventDefault();
            handleBack();
          }}>
          {backIcon}
        </button>
        <form
          className={`w-full`}>
          <label htmlFor="new-todo-input">
            <div id="new-task-title"
              className="mb-2 text-theme-primary-light font-extrabold ">
              Title
            </div>
            <input id="new-todo-input" type="text"
              placeholder="Ex. Brush you teeth"
              className={`bg-slate-200 w-full h-12 rounded-md px-2 mb-4`}
              value={newTodo.title}
              name="title"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="new-todo-color">
            <div className="mb-2 text-theme-primary-light font-extrabold">
              Color
            </div>
            <div id="select-color-section" className={`flex mb-8`}>
              {colorPickers}
            </div>
          </label>
          <button id="add-task-button"
            className={`w-full bg-theme-primary text-font-primary h-12 rounded-md`}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className={"w-full flex justify-center"}
            >
              {params.id === "new" ? "Add Task" : "Update Task"}
              <div className="w-6 h-6 ml-2">
                {addIcon}
              </div>
            </div>
          </button>
        </form>
      </div>
    </main>
  )

}