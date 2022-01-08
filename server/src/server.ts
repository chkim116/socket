import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = http.createServer(app);
const socket = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

socket.on("connection", (io) => {
    io.emit("connected", "socket is connected");

    io.on("message", (msg) => {
        console.log(msg);
    });

    io.on("disconnect", () => {
        console.log("disconnect socket");
    });
});

httpServer.listen(8080, () => {
    console.log("http://localhost:8080 is running");
});
