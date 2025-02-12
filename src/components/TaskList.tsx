import { FC, useRef } from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} from "../redux/taskSlice";

export type TaskAction = "add" | "edit" | "delete" | "toggle";

const TasksList: FC = () => {
  const { tasks, status } = useSelector((state: RootState) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  const newTaskRef = useRef<HTMLInputElement>(null);

  const handleTaskAction = (
    action: TaskAction,
    index: number | null = null,
    value: string | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(addTask(newTaskRef.current!.value));
        newTaskRef.current!.value = "";
        return;
      case "edit":
        dispatch(
          editTask({
            index,
            title: value,
          })
        );
        return;
      case "delete":
        dispatch(deleteTask(index!));
        return;
      case "toggle":
        dispatch(toggleTask(index!));
        return;
      default:
        return;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Task Manager App</h1>
      <div className="input-group mb-3">
        <input
          ref={newTaskRef}
          type="text"
          className="form-control"
          onChange={() => console.log(newTaskRef.current!.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleTaskAction("add")}
        >
          Add Task
        </button>
      </div>
      <div>
        {status === "loading" && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {status === "success" &&
          tasks.map(({ title, completed }, i) => (
            <Task
              key={Math.random() + new Date().getTime()}
              name={title}
              completed={completed}
              index={i}
              handleTaskAction={handleTaskAction}
            />
          ))}
      </div>
    </div>
  );
};

export default TasksList;
