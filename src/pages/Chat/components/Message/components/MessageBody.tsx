import { useEffect, useRef, useState } from 'react'
import { MinidenticonImg } from '../../../../../components/MinidenticonImg';
import { Socket } from 'socket.io-client';
interface MessageBodyProps {
    socket: Socket
}
interface MessageReceived {
    id: string | number;
    message: string;
    username: string;
    date: number;
}
export const MessageBody = ({ socket }: MessageBodyProps): JSX.Element => {
    const [messagesRecieved, setMessagesReceived] = useState<MessageReceived[]>([]);
    const messagesColumnRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        socket.on('receive_message', (data: MessageReceived) => setMessagesReceived(state => [ ...state, { ...data } ]));
        return () => {
            socket.off('receive_message');
        }
    }, [socket]);

    useEffect(() => {
        if (messagesColumnRef.current) {
            messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
        }
    }, [messagesRecieved])

    return (
        <div className="flex flex-col pt-20 overflow-y-scroll h-[90vh] px-4 md:px-10" ref={messagesColumnRef}>
            {messagesRecieved.map((data: any, i: any) => (
                <div key={i}>
                    {data.id === 0 ? <>
                        <div className="flex justify-center mb-4">
                            <div className="text-gray-400 text-sm">
                                {data.message}
                            </div>
                        </div>
                    </> :
                        data.id === socket.id ? <>
                            <div className="flex justify-end mb-1">
                                    <div className="py-2 px-3 bg-blue-400 rounded-full text-white">
                                        {data.message}
                                    </div>
                            </div>
                        </> : <>
                            <div className="flex justify-start mb-4 items-end">
                                <MinidenticonImg username={data.id} saturation="90" className='w-8 h-8 rounded-full bg-gray-100 m-1' />
                                <div className='ml-2 flex flex-col'>
                                    <span className='text-gray-400 text-xs'>{data.username}</span>
                                    <div className="py-2 px-3 mt-1 bg-gray-800 rounded-full text-white max-w-max">
                                        {data.message}
                                    </div>
                                </div>

                            </div>
                        </>}
                </div>
            ))}
        </div>

    )
}