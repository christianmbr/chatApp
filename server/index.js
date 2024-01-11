import express from "express"
import config from '../config.js'
import http from 'http'
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on('connection', socket => { 
    console.log('Client connected!', socket.id)
    socket.emit('id', socket.id)
    socket.on('message', data => {
        console.log(data)
        // socket.broadcast.emit
        socket.broadcast.emit('message', {
            data,
            id: socket.id
        })
    })
})

httpServer.listen(config['severPort'])
console.log(`Server is runing in port: ${config['severPort']}`)