import api from "../apis/task";

const getAllTask = () => {
  return api.get("/taskList");
};

const creatTask = (data) => {
  return api.post("/taskList", data);
};

const deleteTask = (id) => {
  return api.delete(`/taskList/${id}`);
};

const editTask = (id, data) => {
    return api.put(`/taskList/${id}`, data);
  };




const taskServices = {
    getAllTask,
    creatTask,
    deleteTask,
    editTask
};

export default taskServices;