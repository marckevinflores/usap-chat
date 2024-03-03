interface MessageHeaderProps {
    room: string;
    leaveRoom: () => void
}
export const MessageHeader = ({ room, leaveRoom }: MessageHeaderProps): JSX.Element => {
    return (
        <div className="bg-gray-900 py-5 shadow shadow-gray-800 text-gray-300 absolute w-full">
            <div className="flex flex-row items-center px-3">
                <button onClick={leaveRoom} type="button" className="inline-flex items-center text-sm text-gray-500 rounded-lg sm:hidden hover:text-gray-300">
                    <svg viewBox="0 0 24 24" className="fill-red-600 w-10 items-center">
                        <path d="M8.25 5.25L9 4.5H18L18.75 5.25V18.75L18 19.5H9L8.25 18.75V16.5H9.75V18H17.25V6H9.75V7.5H8.25V5.25Z" />
                        <path d="M7.06068 12.7499L14.25 12.7499L14.25 11.2499L7.06068 11.2499L8.78035 9.53027L7.71969 8.46961L4.18936 11.9999L7.71969 15.5303L8.78035 14.4696L7.06068 12.7499Z" />
                    </svg>
                </button>
                <h1 className="text-2xl font-bold mx-auto">{room}</h1>
            </div>
        </div>
    )
}