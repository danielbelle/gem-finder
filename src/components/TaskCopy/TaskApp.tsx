import { useEffect, useReducer } from "react";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  done: boolean;
  x: number;
  y: number;
}

type Action =
  | { type: "added"; id: number; text: string; x: number; y: number }
  | { type: "changed"; task: Task }
  | { type: "deleted"; id: number }
  | { type: "mousemove"; x: number; y: number }
  | { type: "mousedown"; x: number; y: number };

function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        { id: action.id, text: action.text, done: false, x: 123, y: 321 },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "mousemove":
      return [
        ...tasks,

        { id: 1000, text: "abcd", done: false, x: action.x, y: action.y },
      ];
    case "mousedown":
      return [
        ...tasks,
        { id: 1000, text: "abcd", done: false, x: action.x, y: action.y },
      ];
    default: {
      throw Error("Unknown action: ");
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  useEffect(() => {
    const onMouseMove = (e: { clientX: number; clientY: number }) => {
      dispatch({
        type: "mousemove",
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onMouseDown = (e: { clientX: number; clientY: number }) => {
      dispatch({
        type: "mousedown",
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  function handleAddTask(text: string, x: number, y: number) {
    dispatch({
      type: "added",
      id: nextId++,
      text: text,
      x: x,
      y: y,
    });
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <TaskAdd onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks: Task[] = [
  { id: 0, text: "Visit Kafka Museum", done: true, x: 0, y: 0 },
  { id: 1, text: "Watch a puppet show", done: false, x: 1, y: 1 },
  { id: 2, text: "Lennon Wall pic", done: false, x: 2, y: 2 },
];
