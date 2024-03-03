import { Socket } from 'socket.io';
import { getUsersInRoom, removeUser } from '../utils/users';
import { User } from '../interface/user';

export default function leaveRoomHandler(socket: Socket) {
    socket.on('leave_room', (data: User) => {
        const { username, room } = data;
        socket.leave(room);
        const user = removeUser(socket.id);
        if (user) {
          const chatRoomUsers = getUsersInRoom(room);
          socket.to(room).emit('chatroom_users', chatRoomUsers);
          socket.to(room).emit('receive_message', {
            id: 0,
            message: `${username} has left the chat`,
            username: 'admin',
            date: Date.now(),
          });
        }
        console.log(`${username} has left the chat`);
    });
}