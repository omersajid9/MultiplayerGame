import { useEffect } from "react";
import { io } from "socket.io-client";
import {atom, useAtom} from 'jotai'

export const socket = io("http://54.161.94.132:3001");
export const charactersAtom = atom([]);

export const SocketManager = () =>
{
    const [_characters, setCharacters] = useAtom(charactersAtom);
    useEffect(() =>
    {
        function onConnect()
        {
            console.log("Connected Client");
        }
        function onDisconnect()
        {
            console.log("Disconnected Client");
        }
        function onMessage(message)
        {
            console.log("Message: ", message);
        }
        function onCharacters(value) 
        {
            setCharacters(value);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", onMessage);
        socket.on("characters", onCharacters);

        return () =>
        {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message", onMessage);
            socket.off("characters", onCharacters);
        }
    })
}