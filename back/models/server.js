import express from 'express';
import envConfig from "../config/env.js";
import {connectDB} from "../config/db.js";
import http from "http";
import {Server as SocketServer} from "socket.io";
import {getMessages, createMessage} from "../controllers/message.controller.js";
import userRoute from "../routes/user.route.js";
import messageRoute from "../routes/message.route.js";
import cookieParser from "cookie-parser";

export class Server {
    constructor() {
        this.app = express();
        this.port = envConfig.PORT;
        this.server = http.createServer(this.app);
        this.io = new SocketServer(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE']
            }
        });

        this.messagesPath = '/api/messages';
        this.usersPath = '/api/users';

        this.middlewares();
        this.routes();
        this.connectionDB();
        this.socketEvents();
    }

    middlewares() {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use(this.usersPath, userRoute)
        this.app.use(this.messagesPath, messageRoute)
    }

    connectionDB() {
        connectDB();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {

            const emitMessages = async () => {
                const messages = await getMessages();
                socket.emit('loadMessages', messages);
            }

            emitMessages();

            socket.on('requestMessages', async () => {
                const messages = await getMessages()
                socket.emit('loadMessages', messages);
            });

            socket.on('message', async (msg) => {
                const newMessage = await createMessage(msg);
                socket.broadcast.emit('message', newMessage);
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}