import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SigUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleOnSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:3000/api/account/login";
    try {
      const response = await axios.post(url, {
        name: userName,
        password: password,
      });

      window.localStorage.setItem("access-token", response.data.response.token);
      window.alert("Welcome back");
      navigate("/app");
    } catch (err) {
      console.error(err.message);
      window.alert(err.message);
      setPassword("");
      setUserName("");
    }
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleUserName(event) {
    setUserName(event.target.value);
  }

  return (
    <div className="flex h-screen">
      {/* <!-- Left Pane --> */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        Set an image here
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Login
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community free{" "}
          </h1>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userName}
                onChange={handleUserName}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Don't you have an account?{" "}
              <a href="#" className="text-black hover:underline">
                Join us here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
