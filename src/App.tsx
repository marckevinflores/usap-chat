import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { connect } from 'socket.io-client';
import { Join } from './pages/Join';
import { Chat } from './pages/Chat';
import { useState } from 'react';

const socket = connect('http://localhost:4000'); 
type Route = {
  path: string;
  element: JSX.Element;
};

function App() {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');
 const routes: Route[] = [
  {
    path: '/',
    element: <Join username={username} setUsername={setUsername} room={room} setRoom={setRoom} socket={socket} />,
  },
  {
    path: '/chat',
    element: <Chat username={username} room={room} socket={socket} />,
  },
];

const router = createBrowserRouter(routes as RouteObject[]);
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
