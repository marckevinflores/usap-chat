import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
interface JoinProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    room: string;
    setRoom: Dispatch<SetStateAction<string>>;
    socket: Socket;
  }
export const Join = ({ username, setUsername, room, setRoom, socket }: JoinProps): JSX.Element => {
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room }, () => {
                localStorage.setItem('user', JSON.stringify({username, room}));
            });
        }
        navigate('/chat', { replace: true})
    };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <a href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Logo/>
                Usap Chat
            </a>
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div>
                            <label htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display
                                Name</label>
                            <input type="text" name="username" id="username" autoComplete="off" required 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John Doe" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="room"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room</label>
                            <input type="text" name="room" id="room" placeholder="Room 1" required autoComplete='false'
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setRoom(e.target.value)}
                                />
                        </div>
                        <div>
                            <button onClick={joinRoom}
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join</button>
                        </div>
                </div>
            </div>
        </div>
    </section>
  )
}