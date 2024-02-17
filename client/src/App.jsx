import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./index.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC]">
      {!showChat ? (
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-30 border border-gray-200">
          <h3 className="font-bold text-2xl text-center py-2">Join Chat</h3>
          <div className="flex flex-col">
            <input
              type="text"
              className="border border-gray-300 shadow-sm rounded-md p-1 my-2 text-center focus:border-gray-400"
              placeholder="Enter your name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              className="border border-gray-300 shadow-sm rounded-md p-1 my-2 text-center focus:border-gray-400"
              placeholder="Enter Room ID"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button
              className="hover:bg-green-500 hover:border-green-500 border border-green-600 bg-green-600 text-white rounded-lg my-3 p-2"
              onClick={joinRoom}
            >
              Join A Room
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
