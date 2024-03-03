import { useEffect, useState } from 'react'
import { MinidenticonImg } from '../../../components/MinidenticonImg';
import { Logo } from '../../../components/Logo';
import { Socket } from 'socket.io-client';
interface UserProps {
    socket: Socket;
    leaveRoom: () => void
}
interface ChatroomUser {
    id: string;
    username: string;
    room: string;
}
export const User = ({ socket, leaveRoom }: UserProps): JSX.Element => {
    const [users, setUsers] = useState<ChatroomUser[]>([]);

    useEffect(() => {
        socket.on('chatroom_users', data => setUsers(data));
        return () => {
            socket.off('chatroom_users');
        }
    }, [socket]);

    return (
        <>
            <div className="flex bg-gray-900 py-4 ps-7 shadow shadow-gray-800 text-gray-300 items-center">
                <Logo />
                <h1 className="text-2xl font-bold">Users</h1>
            </div>
            <div className="overflow-y-auto border-gray-700 relative">
                <div className='h-[90vh]'>
                    {users.map((data, i) => (
                        <div key={i} className={`px-7 flex flex-row m-3 py-3 items-center border-gray-700 text-white ${data.id === socket.id ? ' bg-gray-800 rounded-full' : null}`}>
                            <div className="w-1/4">
                                <MinidenticonImg username={data.id} saturation="90" className='w-12 h-12 rounded-full bg-gray-100' />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">{data.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col absolute bottom-0 border-t border-gray-700 py-4 w-full bg-gray-900'>
                <button onClick={leaveRoom} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 dark:bg-red-600 dark:hover:bg-red-700 ">Leave</button>
            </div>
        </>
    )
}