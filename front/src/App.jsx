import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io("/")

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [id, setId] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    socket.emit('message', message)
    setMessage('')
  }

  function handleChange(event) {
    setMessage(event.target.value)
  }

  useEffect(()=>{
    socket.on('id', id => setId(id))
    socket.on('message', (data) => {
      setMessages(state => [...state, {
        data: data.data,
        id: data.id
      }])
    })
    return ()=> {
      socket.off('message')
    }
  }, [])

  return (
    <div>
      <h2>User: {id.substring(0, 2)}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Write a message'
          value={message}
          onChange={handleChange}
        />
        <button>Send</button>
      </form>
      <ul>
        {
          messages.map((message, i) => (
            <div key={i}>
              <li>
                {message.id.substring(0,2)}
                <p>
                  {message.data}
                </p>
              </li>
            </div>
          ))
        }
      </ul>
    </div>
  )
}
