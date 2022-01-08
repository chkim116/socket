import { useEffect } from "react";
import socketIo from "socket.io-client";

const socket = socketIo("http://localhost:8080");

const View = () => {
    useEffect(() => {
        socket.on("connected", (msg) => console.log(msg));
    }, []);
    return <div></div>;
};

export default View;
