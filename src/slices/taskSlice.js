import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import taskServices from "../services/taskServices";
import {toast} from "react-toastify"


const reterieveAllTasks = createAsyncThunk("taskList/retrieve", async () => {
  const response = await taskServices.getAllTask();

  return response.data.reverse();
});

const createTaskApi = createAsyncThunk("taskList/create", async (data) => {
  const response = await taskServices.creatTask(data);
  return response.data;
});

const deleteTaskApi = createAsyncThunk("taskList/delete", async (id) => {
  await taskServices.deleteTask(id);
  return { id }; // because it goes as a payload in action so that is pass a object
});


const editTaskApi = createAsyncThunk("contact/edit", async (data) => {
    return await (
      await taskServices.editTask(data.id, data)
    ).data;
  });



  // Notifcation 


  const notify = msg => {
    toast.success(msg , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }



  



const initialState = {
  taskList: [],
  firstTime: true
};

const taskSlice = createSlice({
  name: "task",

  initialState,

  reducers: {},

  extraReducers: {
    [reterieveAllTasks.fulfilled]: (state, action) => {
      if(state.firstTime){
        notify("Successfully Got All Task !")
      }
      state.taskList = action.payload;
      state.firstTime = false
    },
    [createTaskApi.fulfilled]: (state, action) => {
      
      state.taskList.unshift(action.payload);
      notify("New Task Added Successfully !")
    },
    [deleteTaskApi.fulfilled]: (state, {payload}) => {
      const idx = state.taskList.findIndex((task) => task.id === payload.id);
      state.taskList.splice(idx, 1);
      notify("Task Deleted Successfully !")
    },


    [editTaskApi.fulfilled]: (state, action) => {
        state.taskList = state.taskList.map((task) =>
          task.id === action.payload.id ? { ...action.payload } : task
        );
        notify("Task Saved Successfully !")
      },


  },
});

export {
    reterieveAllTasks,
    createTaskApi,
    deleteTaskApi,
    editTaskApi
};

export const { setEditContact } = taskSlice.actions;
export const taskSelector = (state) => state.task;
export default taskSlice.reducer;