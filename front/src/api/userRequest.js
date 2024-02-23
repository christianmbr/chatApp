import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

async function register(user) {
  const url = "/account/register";
  try {
    return await axiosInstance.post(url, user);
  } catch (error) {
    return error.message;
  }
}

async function login(name, password) {
  const url = "/account/login";
  const findUser = { name, password };
  try {
    return await axiosInstance.post(url, findUser);
  } catch (error) {
    return error.message;
  }
}

async function verifyToquen(token) {
  const url = "/account/user";
  try {
    const config = {
      headers: {
        access: token,
      },
    };
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export default {
  register,
  verifyToquen,
  login,
};
