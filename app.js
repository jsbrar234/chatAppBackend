import express from "express"
import { Server } from "socket.io";
import { createServer } from "http"
import cors from 'cors'



const app = express();

const port = 3000;


const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("HELLO WORLD!");
})

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("message" , ({room, message}) => {
     
        console.log({room, message})

        io.to(room).emit("recieve-message", message);
    })

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`User Joined Room ${room}`)
    })

    socket.on("disconnect", (s) => {
        console.log("User Disconnected", socket.id)
    })


})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})