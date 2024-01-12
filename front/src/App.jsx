import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  useEffect(() => {
    socket.on("id", (id) => setId(id));
    socket.on("message", (data) => {
      setMessages((state) => [
        ...state,
        {
          data: data.data,
          id: data.id,
        },
      ]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="flex-col">
      <div className="flex px-10 py-4">
        <h2 className="flex-1 text-center text-2xl">
          USER {id.substring(0, 2).toUpperCase()}
        </h2>
        {/* <IconUser className="flex-none w-7 h-7" /> */}
      </div>
      <form
        className="flex justify-center p-4 shadow-md gap-8"
        onSubmit={handleSubmit}
      >
        <div class="w-72">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
              type="text"
              value={message}
              onChange={handleChange}
            />
            <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              write a message
            </label>
          </div>
        </div>
        <button>
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
      <div className="p-8">
        {messages.map((message, i) => (
          <div class="flex flex-col items-start">
            <span class="text-sm text-gray-500 font-bold">
              {message.id.substring(0, 2).toUpperCase()}
            </span>

            <div class="mt-1 flex items-end justify-start">
              <div class="flex flex-col items-end">
                <div class="px-3 py-2 rounded-l-full rounded-br-full bg-teal-800">
                  <p class="text-sm text-white font-bold">{message.data}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
