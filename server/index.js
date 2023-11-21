import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: 'https://flexgame-client-9f23aa5c1cd5.herokuapp.com',
        credentials: true
    }
});

const characters = [];

const generateRandomPosition = () =>
{
    return [Math.random() * 3, 0, Math.random() * 3];
}

const generateRandomHexColor = () =>
{
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

io.listen(3001);

io.on("connection", (socket) => {
    console.log("New user connected");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomHexColor(),
        topColor: generateRandomHexColor(),
        bottomColor: generateRandomHexColor()
    })
    
    socket.emit("message", "Welcome to the chat");

    io.emit("characters", characters);

    socket.on("move", (position) =>
    {
        const character = characters.find((char)=>char.id===socket.id);
        character.position = position;
        io.emit("characters", characters);
    })
    
    socket.on("disconnect", () => {
        console.log("User disconnected");
        
        characters.splice(characters.findIndex((char)=>char.id===socket.id), 1)
        io.emit("characters", characters);
    })

})