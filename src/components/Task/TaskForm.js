import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskApi } from "../../slices/taskSlice";
import { motion } from "framer-motion";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const onAddTask = () => {
    if (title.trim() === "" || description === "") return;
    dispatch(createTaskApi({ title, description, completed: false }));

    setTitle("");
    setDescription("");
  };

  return (
    <motion.div
      className="form"
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <div className="centric">
        <h2 className="title">ADD TASK</h2>
        <label htmlFor="title">*Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="Description">*Description</label>
        <textarea
          type="text"
          id="Description"
          name="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={onAddTask}>Save</button>
      </div>
    </motion.div>
  );
};

export default TaskForm;
