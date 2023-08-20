// call api through axios

import axios from "axios";

export const getUser = async (uId) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `users?id=${uId}`
  );
  return response.data;
};

export const getUserBalance = async (uId) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `users/balance?id=${uId}`
  );
  return response.data;
};

export const fundUser = async (uId, amount) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + `users/fund?id=${uId}&amount=${amount}`
  );
  return response.data;
};

export const getContractBalance = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + "balance"
  );
  return response.data;
};

export const getTransactions = async () => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `transactions`
  );
  return response.data;
};

export const getUserTransactions = async (uId) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + `users/transactions?id=${uId}`
  );
  return response.data;
};

export const completeEvent = async (uId, taskId) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL +
      `users/events/add?uId=${uId}&eId=${taskId}`
  );
  return response.data;
};

export const stakeTokens = async (uId, amount) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + `users/stake?id=${uId}&amount=${amount}`
  );
  return response.data;
};

export const unstakeTokens = async (uId) => {
  const response = await axios.post(
    process.env.REACT_APP_BACKEND_URL + `users/unstake?id=${uId}`
  );
  return response.data;
};
