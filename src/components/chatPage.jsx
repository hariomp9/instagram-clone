import React, { useEffect, useRef, useState } from "react";
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
import PaperClip from "@/svg/paper-clip";

const ChatPage = () => {
  const [message, setTextMessage] = useState("");
  const { token, user_Details, suggestedUsers } = useSelector(
    (state) => state.Auth
  );
  const { selectedUser } = useSelector((state) => state.userAuth);
  const { onlineUsers, messages } = useSelector((state) => state.Chat);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null); // State for file (image or video)
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePaperclipClick = () => {
    fileInputRef.current.click();
  };

  const sendMessageHandler = async (receiverId) => {
    try {
      const formData = new FormData();
      if (message) {
        formData.append("message", message);
      }
      if (selectedFile) {
        formData.append(
          selectedFile.type.startsWith("image/") ? "image" : "video",
          selectedFile
        );
      }

      const response = await axios.post(
        `${Base_url}/api/v1/message/send/${receiverId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        dispatch(setMessages([...(messages || []), response.data.newMessage]));
        setTextMessage("");
        setSelectedFile(null); // Reset file after sending
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
              {/* <div className="p-4 flex items-center gap-2 relative">
                {" "}
                <PaperClip />
                <input
                  type="text"
                  className="flex-1 pl-9 p-2 border border-gray-600 rounded-lg outline-none"
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
              </div> */}
              <div className="p-4 flex items-center gap-2 relative">
                <PaperClip
                  handlePaperclipClick={handlePaperclipClick}
                  className="cursor-pointer"
                />
                <input
                  type="text"
                  className="flex-1 pl-9 p-2 border border-gray-600 rounded-lg outline-none"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setTextMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      sendMessageHandler(selectedUser?._id);
                  }}
                />
                <Button
                  className="h-10"
                  onClick={() => sendMessageHandler(selectedUser?._id)}
                >
                  Send
                </Button>

                {/* Hidden file input for images and videos */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
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
