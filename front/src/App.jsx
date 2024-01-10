import { useState } from 'react'
import io from 'socket.io-client'

const socket = io("/")

export default function App() {
  const [message, setMessage] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    socket.emit('message', message)
  }

  function handleChange(event) {
    setMessage(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Write a message'
          onChange={handleChange}
        />
        <button>Send</button>
      </form>
    </div>
  )
}
