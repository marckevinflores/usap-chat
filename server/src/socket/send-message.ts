import { Server, Socket } from 'socket.io';
import { User } from '../interface/user';

export default function sendMessageHandler(socket: Socket, server: Server) {
    socket.on('send_message', (data: User) => {
        const { id, message, username, room } = data;
        server.in(room).emit('receive_message', {
          id,
          message,
          username,
          date: Date.now(),
        });
    });
}