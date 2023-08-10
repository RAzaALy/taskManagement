import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskApi, editTaskApi } from "../../slices/taskSlice";
import { motion } from "framer-motion";

const Task = ({ title, description, completed, id }) => {
  const dispatch = useDispatch();

  const onEditTask = () => {
    dispatch(editTaskApi({ title, description, completed: !completed, id }));
  };

  const onDeleteTask = () => {
    dispatch(deleteTaskApi(id));
  };

  return (
    <motion.div
      className="task"
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: [null, -10, 10, -10, 10, -5, 5, -2, 2, 0],
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "35rem",
        minHeight: "20rem",
        backgroundColor: "white",
        padding: "1rem",
        paddingBottom: "2rem",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "1rem",
        margin: "1.2rem",
      }}
    >
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <div className="actionButton">
        <button className="del" onClick={onDeleteTask}>
          DEL
        </button>
        <button
          className={completed ? "completed" : "pending"}
          onClick={onEditTask}
        >
          {completed ? "Complete" : "Incomplete"}
        </button>
      </div>
    </motion.div>
  );
};

export default Task;
