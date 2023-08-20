import axios from "axios";

export const getRewards = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + "rewards"
  );
  return response.data;
};

export const getTasks = async () => {
  const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "tasks");
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "tasks",
    task
  );
  return response.data;
};

export const createReward = async (reward) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "rewards",
    reward
  );
  return response.data;
};

export const getAvailableTasks = async (uId) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `tasks?id=${uId}`
  );
  return response.data;
};

export const getAvailableRewards = async (uId) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `rewards?id=${uId}`
  );
  return response.data;
};
