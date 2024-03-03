import { User } from "./components/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Message from "./components/Message";
import { Socket } from "socket.io-client";
interface ChatProps {
   socket: Socket;
   username: string;
   room: string;
}
export const Chat = ({ socket, username, room }: ChatProps): JSX.Element => {
   const navigate = useNavigate();

   useEffect(() => {
      window.addEventListener('beforeunload', alertUser)
      window.addEventListener('unload', handleTabClosing)
      return () => {
          window.removeEventListener('beforeunload', alertUser)
          window.removeEventListener('unload', handleTabClosing)
      }
  })

   const handleTabClosing = () => {
      socket.emit('leave_room', { username, room });
      navigate('/', { replace: true });
   }

   const alertUser = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
   }

   const leaveRoom = () => {
      const isConfirmed = window.confirm('Are you sure you want to leave?');
      if(isConfirmed){
          socket.emit('leave_room', { username, room });
          navigate('/', { replace: true });
          localStorage.removeItem('user')
      }
   }
   
   return (
      <div className="container h-screen max-w-full bg-gray-900">
         <div className="grid grid-cols-2 md:grid-cols-4 w-full h-full">
            <div className="md:col-span-1 relative hidden md:block border-r border-gray-800">
               <User socket={socket} leaveRoom={leaveRoom} />
            </div>
            <div className="flex flex-col justify-between col-span-2 md:col-span-3 relative">
               <Message socket={socket} username={username} room={room} leaveRoom={leaveRoom} />
            </div>
         </div>
      </div>
   )
}