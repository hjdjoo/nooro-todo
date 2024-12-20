import Link from "next/link";
import TodoView from "./components/ToDoView";
import { ToDo } from "@/_types/client-types";
import { AddIcon } from "@/_icons/icons";

export const revalidate = 0;

export default async function Home() {

  const res = await fetch("http://localhost:5000/api/todo/all")
  const todos: ToDo[] = await res.json();

  const addIcon = AddIcon();


  return (
    <div className="flex flex-col justify-center items-center">
      <main id="homepage-main"
        className="h-[80vh] w-screen flex flex-col items-center pt-12 bg-dark-secondary">
        <Link href="/task"
          className="absolute top-[calc(20vh-1.5rem)] w-[50%] h-12">
          <button id="create-task-button"
            className="z-10 flex justify-center items-center bg-theme-primary text-font-primary rounded-md h-full w-full ">
            Create Task
            <div className="w-6 h-6 ml-2">
              {addIcon}
            </div>
          </button>
        </Link>
        <TodoView todos={todos} />
      </main>
    </div>
  );
}
