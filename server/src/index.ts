import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer, Socket } from 'socket.io';
import joinRoomHandler from './socket/join-room';
import sendMessageHandler from './socket/send-message';
import leaveRoomHandler from './socket/leave-room';

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
io.on('connection', (socket: Socket) => {
  console.log(`User connected ${socket.id}`);
  joinRoomHandler(socket);
  sendMessageHandler(socket, io);
  leaveRoomHandler(socket)
});

server.listen(4000, () => console.log('Server is running on port 4000'));
