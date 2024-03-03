import { Socket } from 'socket.io';
import { addUser, getUsersInRoom } from '../utils/users';
import { User } from '../interface/user';

export default function joinRoomHandler(socket: Socket) {
  socket.on('join_room', (payload: User, callback: Function) => {
    if (typeof callback !== 'function') {
      return socket.disconnect();
    }
    const { user, error } = addUser({
      id: socket.id,
      ...payload,
    });
    if (error) {
      return callback(error);
    }
    if (user) {
      socket.join(user.room);
      socket.to(user.room).emit('receive_message', {
        id: 0,
        message: `${user.username} has joined the chat room`,
        username: 'admin',
        date: Date.now(),
      });
      socket.emit('receive_message', {
        id: 0,
        message: `Welcome ${user.username} to our ${user.room} group`,
        username: 'admin',
        date: Date.now(),
      });
      const chatRoomUsers = getUsersInRoom(payload.room);
      socket.to(payload.room).emit('chatroom_users', chatRoomUsers);
      socket.emit('chatroom_users', chatRoomUsers);
    }
    callback();
  });
}