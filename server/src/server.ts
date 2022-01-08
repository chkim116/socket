import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const httpServer: http.Server = http.createServer(express());
const socket: Server = new Server(httpServer, {
    cors: { origin: "*" },
});

class App {
    run() {
        httpServer.listen(8080, () =>
            console.log("http://localhost:8080 is running")
        );
    }
}

class Main extends App {
    io: Socket | null = null;

    connect() {
        this.io?.emit("connected", true);
    }

    disconnect() {
        this.io?.on("disconnect", () => {
            console.log("disconnect socket");
        });
    }

    logger() {
        this.io?.onAny((ev, ...args) => console.log(ev, args));
    }

    connection() {
        socket.on("connection", (io) => {
            this.io = io;
            if (!this.io) throw new Error("can not find socket io");
            console.log("connect on server");
            this.logger();
            this.connect();
            this.disconnect();
        });
    }
}

const server = new Main();

server.run();
server.connection();
