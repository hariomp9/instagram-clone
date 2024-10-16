import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import { Base_url } from "@/utils/config";
import LeftSidebar from "./leftSidebar";

const ChatPage = () => {
  const [message, setTextMessage] = useState("");
  const { token, user_Details, suggestedUsers } = useSelector(
    (state) => state.Auth
  );
  const { selectedUser } = useSelector((state) => state.userAuth);
  const { onlineUsers, messages } = useSelector((state) => state.Chat);
  const dispatch = useDispatch();
  // console.log(suggestedUsers, "suggestedUsers");

  const sendMessageHandler = async (receiverId) => {
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/message/send/${receiverId}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        dispatch(setMessages([...(messages || ""), response.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      e.preventDefault();
      sendMessageHandler(selectedUser?._id);
    }
  };
  return (
    <>
      <div className="">
        <LeftSidebar />
        <div className="flex ml-[16%] h-screen">
          <section className="w-full md:w-1/4 my-8">
            <h1 className="font-bold mb-3 px-3 text-xl">
              {user_Details?.Username}
            </h1>
            <hr className="mb-4 border-gray-300" />
            <div className="overflow-y-auto h-[80vh]">
              {Array.isArray(suggestedUsers) &&
                suggestedUsers.map((suggestedUse, index) => {
                  const isOnline = onlineUsers.includes(suggestedUse?._id);
                  return (
                    <div
                      key={index}
                      onClick={() => dispatch(setSelectedUser(suggestedUse))}
                      className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="w-14 h-14">
                        <img
                          src={suggestedUse?.profilePicture}
                          width={500}
                          height={500}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {suggestedUse?.Username}
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            isOnline ? "text-green-600" : "text-red-600"
                          } `}
                        >
                          {isOnline ? "online" : "offline"}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
          {selectedUser ? (
            <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
              <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
                <div>
                  <img
                    src={selectedUser?.profilePicture}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span>{selectedUser?.Username}</span>
                </div>
              </div>
              <Messages selectedUser={selectedUser} />
              {/* <div className="flex items-center p-4 border-t border-t-gray-300">
                <Input
                  value={message}
                  onChange={(e) => setTextMessage(e.target.value)}
                  type="text"
                  className="flex-1 mr-2 focus-visible:ring-transparent"
                  placeholder="Messages..."
                />
                <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                  Send
                </Button>
              </div> */}
              <div className="p-4 flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="h-10"
                  // variant="primary"
                  onClick={() => sendMessageHandler(selectedUser?._id)}
                >
                  Send
                </Button>
              </div>
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center mx-auto">
              <MessageCircleCode className="w-32 h-32 my-4" />
              <h1 className="font-medium">Your messages</h1>
              <span>Send a message to start a chat.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
