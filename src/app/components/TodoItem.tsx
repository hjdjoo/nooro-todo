import { ToDo } from "@/_types/client-types";

interface TodoItemProps {
  item: ToDo
  updateItem: (item: ToDo, status: boolean) => void
  deleteItem: (item: ToDo) => void
}

export default function TodoItem(props: TodoItemProps) {

  const { item, deleteItem, updateItem } = props

  return (
    <div key={`todo-item-${item.id}`}
      id={`todo-item-${item.id}`}
      className="h-16 w-[60vw] flex justify-evenly items-center m-2 bg-slate-400 rounded-md">
      <div id={`todo-item-${item.id}-complete`}
        className={`grow-0`}>
        <input type="checkbox"
          className={`checkbox-rounded`}
          checked={item.complete}
          value={item.id}
          onChange={() => {
            updateItem(item, item.complete)
          }} />
      </div>
      <div id={`todo-item-${item.id}-title`}
        className={`w-[60%]`}>
        <p>{item.title}</p>
      </div>
      <div id={`todo-item-${item.id}-delete`}
        className={`grow-0`}>
        <button className={`bg-slate-100 px-2`}
          onClick={() => {
            deleteItem(item);
          }}>
          delete
        </button>
      </div>
    </div>
  )

}