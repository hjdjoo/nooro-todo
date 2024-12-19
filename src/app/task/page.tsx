import { ToDo } from "@/_types/client-types"

interface TaskPageProps {
  todo?: ToDo
}

export default function TaskPage(props: TaskPageProps) {

  const todo = props.todo ? props.todo : {};

  const colors = ["red", "orange", "yellow", "green", "blue", "purple", "scarlet", "coral", "beige"]

  const colorPickers = colors.map((color) => {
    return (
      <div key={`select-${color}`} id={`select-${color}`}
        className={`bg-${color} h-12 w-12`}>
        <button>
        </button>
      </div>
    )
  })

  return (
    <div id="add-edit-task-page"
      className={`flex flex-col items-center w-[60vw]`}>
      <button id="back-button"
        className={`self-start bg-slate-200`}>Back</button>
      <form action=""
        className={`w-full`}>
        <label htmlFor="new-todo-input">
          <div>
            Title
          </div>
          <input id="new-todo-input" type="text"
            placeholder="Ex. Brush you teeth"
            className={`bg-slate-200 w-full h-12 rounded-md px-2`}
          />
        </label>
        <label htmlFor="new-todo-color">
          <div>
            Color
          </div>
          <div id="select-color-section" className={`flex`}>
            {colorPickers}
          </div>
        </label>
        <button id="add-task-button"
          className={`w-full bg-blue-300 h-12 rounded-md`}>
          Add Task +</button>
      </form>
    </div>
  )

}