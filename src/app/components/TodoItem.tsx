
import { ToDo } from "@/_types/client-types";
import { useRouter } from "next/navigation";
import { Trashcan } from "@/_icons/icons";

interface TodoItemProps {
  item: ToDo
  updateItem: (item: ToDo, status: boolean) => void
  deleteItem: (item: ToDo) => void
}

export default function TodoItem(props: TodoItemProps) {

  const router = useRouter();

  const activeItemClasses: { [property: string]: string } = {
    decorate: "line-through",
    color: "text-font-secondary"
  }

  const { item, deleteItem, updateItem } = props

  const trashcan = Trashcan();

  return (
    <div key={`todo-item-${item.id}`}
      id={`todo-item-${item.id}`}
      className="h-16 w-[50vw] flex justify-evenly items-center m-2 bg-dark-secondary-light rounded-md hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        if (e.target instanceof HTMLElement) {

          if (e.target.nodeName === "INPUT") {
            return;
          }
          if (e.target.nodeName === "DIV" || e.target.nodeName === "P") {
            router.push(`/task/${item.id}`)
          }
        }
      }}
    >
      <div id={`todo-item-${item.id}-complete`}
        className={`flex items-center justify-center border-2 border-theme-primary-light rounded-full w-[1rem] h-[1rem]`}>
        <input type="checkbox"
          className={`checkbox-rounded checkbox-color`}
          checked={item.complete}
          value={item.id}
          onChange={(e) => {
            e.preventDefault();
            updateItem(item, item.complete)
          }} />
      </div>
      <div id={`todo-item-${item.id}-title`}
        className={`w-[60%] text-font-primary ${item.complete ? `${activeItemClasses.decorate} ${activeItemClasses.color}` : ""}`}>
        <p>{item.title}</p>
      </div>
      <button className={`px-2`}
        onClick={() => {
          deleteItem(item);
        }}>
        <div id={`todo-item-${item.id}-delete`}
          className={`h-[1.5rem] w-[1.5rem] ${!item.complete ? "text-slate-200" : "text-slate-500"}`}>
          {trashcan}
        </div>
      </button>

    </div>
  )

}