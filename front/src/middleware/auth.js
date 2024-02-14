import axios from "axios";

export async function validateToken() {
  const token = window.localStorage.getItem("access-token");
  const url = `http://localhost:3000/api/account/validate/${token}`;

  try {
    if (token) {
      await axios.get(url);
      return true;
    }
  } catch (error) {
    return false;
  }
}
