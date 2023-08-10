import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/Task/TaskForm";
import TaskList from "./components/Task/TaskList";
import { useDispatch } from "react-redux";
import { reterieveAllTasks } from "./slices/taskSlice";
import { motion } from "framer-motion";




import Notify from "./components/Notification/Notify";

function App() {
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();



  useEffect(() => {
    if (firstTime) {
      dispatch(reterieveAllTasks());
      setFirstTime(false);
      return;
    } else {
      const interval = setInterval(() => {
        dispatch(reterieveAllTasks());
        
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch,firstTime]);

  return (
    <>
      <motion.div className="container"
      
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
        {/* navbar  */}

        <div className="navbar">
          <motion.div
            className="logo"
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
            <img src="funfox.jpeg" alt="funfox" />
          </motion.div>
        </div>

        <Notify/>


        {/* main area  */}

        <div className="main">
          <TaskForm />
          <TaskList />
        </div>

      </motion.div>
    </>
  );
}

export default App;
