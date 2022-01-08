import { useEffect, useState } from "react";
import socketIo, { Socket } from "socket.io-client";
import { URL } from "../constants/var";

const socket = socketIo(URL);

export const useSocket = (): { isConnect: boolean; socket: Socket } => {
    const [isConnect, setIsConnect] = useState(false);
    useEffect(() => {
        socket.on("connected", (msg) => setIsConnect(!!msg));
    }, []);
    return { isConnect, socket };
};
