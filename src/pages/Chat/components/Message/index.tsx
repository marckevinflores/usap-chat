import { MessageHeader } from './components/MessageHeader'
import { MessageBody } from './components/MessageBody'
import { MessageInput } from './components/MessageInput'
import { Socket } from 'socket.io-client'
interface MessageProps {
  socket: Socket;
  username: string;
  room: string;
  leaveRoom: () => void
}
const Message = ({socket, username, room, leaveRoom}: MessageProps) => {
  return (
    <>
    <MessageHeader room={room} leaveRoom={leaveRoom}/>
    <MessageBody socket={socket}/>
    <MessageInput socket={socket} username={username} room={room}/>
    </>
  )
}
export default Message;