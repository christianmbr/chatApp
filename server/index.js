import express from "express"
import config from '../config.js'
import http from 'http'
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

io.on('connection', socket => { 
    console.log('Client connected!')
    socket.on('message', data => {
        console.log(data)
    })
})

httpServer.listen(config['severPort'])
console.log(`Server is runing in port: ${config['severPort']}`)