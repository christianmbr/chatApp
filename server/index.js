import express from "express";
import config from "../config.js";
import http from "http";
import { Server } from "socket.io";
import account from "./src/routes/accountRouter.js";
import mongoConnection from "./src/model/mongoConnection.js";
import cors from "cors";

const date = new Date();

// Building the app.
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Mongo connection.
mongoConnection.connect();

// Routes.
app.use(express.json());
app.use(cors());
app.use("/api/account", account);

io.on("connection", (socket) => {
  console.log("Client connected!", socket.id);
  socket.emit("id", socket.id);
  socket.on("message", (data) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    socket.broadcast.emit("message", {
      data,
      id: socket.id,
      date: `${hour}:${minutes}`,
    });
  });
});

httpServer.listen(config["severPort"], () => {
  console.log(`Server is runing in port: ${config["severPort"]}`);
});
