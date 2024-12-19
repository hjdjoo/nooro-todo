import Link from "next/link";
import TodoView from "./components/ToDoView";
import { ToDo } from "@/_types/client-types";


export default async function Home() {

  const res = await fetch("http://localhost:5000/api/todo/all")
  const todos: ToDo[] = await res.json();

  return (
    <div className="flex flex-col justify-center items-center">
      <main id="homepage-main" className="h-[80vh] w-full flex flex-col items-center pt-12 border border-black">
        <Link href="/task"
          className="absolute top-[calc(20vh-1.5rem)] w-[50%] h-12">
          <button id="create-task-button"
            className="z-10 bg-blue-200 rounded-md h-full w-full">
            Create Task +
          </button>
        </Link>
        <TodoView todos={todos} />
      </main>
    </div>
  );
}
