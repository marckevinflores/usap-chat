import { User } from "../interface/user";

const users: User[] = [];

const addUser = ({ id, username, room }: User): { user?: User; error?: string } => {
  room = room?.trim().toLowerCase();
  username = username?.trim().toLowerCase();
  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }
  const user: User = { id, username, room };
  users.push(user);
  return { user };
};

const getUser = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room: string): User[] => {
  room = room?.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

const removeUser = (id: string): User | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export { addUser, getUser, getUsersInRoom, removeUser };