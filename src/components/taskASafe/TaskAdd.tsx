import { useState } from "react";

interface AddTaskProps {
  onAddTask: (text: string) => void;
}

export default function TaskAdd({ onAddTask }: AddTaskProps) {
  const [text, setText] = useState<string>("");

  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          onAddTask(text);
        }}
      >
        Add
      </button>
    </>
  );
}
