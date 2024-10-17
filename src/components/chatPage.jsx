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
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { FaRegGrinSquint } from "react-icons/fa"; // GIF icon

const ChatPage = () => {
  const [message, setTextMessage] = useState("");
  const { token, user_Details, suggestedUsers } = useSelector(
    (state) => state.Auth
  );
  const { selectedUser } = useSelector((state) => state.userAuth);
  const { onlineUsers, messages } = useSelector((state) => state.Chat);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState(""); // Add this state for the selected GIF

  const GIPHY_API_KEY = "VA7z8gpiCzjtnbuAqUL0GUQfZEzvkeQ7";

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePaperclipClick = () => {
    fileInputRef.current.click();
  };

  const fetchGifs = async (query) => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=10`
      );
      setGifs(response.data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const selectGif = (gifUrl) => {
    setSelectedGifUrl(gifUrl); // Set selected GIF URL
    setShowGifPicker(false); // Close GIF picker after selecting
  };

  const sendMessageHandler = async (receiverId) => {
    try {
      const formData = new FormData();
  
      // Append message if text is present
      if (message) {
        formData.append("message", message);
      }
  
      if (selectedGifUrl) {
        formData.append("videos", selectedGifUrl); // Add GIF to videos array
      }
  
      // Append selected file if any
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
        setTextMessage(""); // Reset text message
        setSelectedFile(null); // Reset file after sending
        setSelectedGifUrl(""); // Reset GIF after sending
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

  const handleEmojiClick = (emoji) => {
    setTextMessage((prevMessage) => prevMessage + emoji.emoji); // Add emoji to the message
    setShowPicker(false); // Close emoji picker
    inputRef.current.focus(); // Refocus the input field
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

              <div className="p-4 flex items-center gap-4 relative">
                <PaperClip
                  handlePaperclipClick={handlePaperclipClick}
                  className="cursor-pointer"
                />
                <button
                  className="ml-8"
                  onClick={() => setShowPicker((prev) => !prev)}
                >
                  <BsEmojiSmile size={24} />
                </button>

                {/* Emoji Picker Dropdown */}
                {showPicker && (
                  <div className="absolute bottom-14 left-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}

                <button
                  className="mx-4"
                  onClick={() => setShowGifPicker((prev) => !prev)}
                >
                  <FaRegGrinSquint size={24} />
                </button>

                
                {showGifPicker && (
                  <div className="absolute bottom-14 left-10 bg-white p-2 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Search GIFs..."
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => fetchGifs(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {gifs.map((gif) => (
                        <img
                          key={gif.id}
                          src={gif.images.fixed_height.url}
                          alt="GIF"
                          className="cursor-pointer"
                          onClick={() => {
                            selectGif(gif.images.fixed_height.url); // Use the selectGif function
                            sendMessageHandler(selectedUser?._id); // Call sendMessageHandler after selecting GIF
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

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
