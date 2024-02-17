import React, { useState, useEffect } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  console.log(messageList);

  return (
    <div className="relative w-96">
      <div className="flex flex-col bg-white shadow-lg sm:rounded-3xl p-5 bg-clip-padding bg-opacity-30 border border-gray-200">
        <div className="relative my-2">
          <span>Live Chat - Logged as <b>{username}</b></span>
        </div>
        <div className="flex flex-col min-h-100 bg-white h-80 rounded-lg overflow-y-scroll">
          {messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className={`flex flex-grow ${
                  messageContent.author === username
                    ? "justify-start"
                    : "justify-end"
                } m-2`}
              >
                <div
                  className={`p-3 ${
                    messageContent.author === username
                      ? "bg-green-500"
                      : "bg-blue-700"
                  } text-white rounded-lg w-56`}
                >
                  {messageContent.message}
                  <div className="text-gray-700 text-xs flex justify-between bg-white p-1 mt-4 rounded-md">
                    <span>{messageContent.author}</span>
                    <span>{messageContent.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative my-2">
          <input
            type="text"
            className="w-full p-2 rounded-md"
            placeholder="Hey..."
            value={currentMessage}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button
            className="hover:bg-green-500 hover:border-green-500 border border-green-600 bg-green-600 text-white rounded-lg my-3 p-2"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
