import React from "react";
import Task from "./Task";
import { useSelector } from "react-redux";
import { taskSelector } from "../../slices/taskSlice";

const TaskList = () => {
  const { taskList } = useSelector(taskSelector);

  return (
    <div className="taskList">
      <div className="centric">
        {taskList.map((task, idx) => (
          <Task
            key={idx}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
