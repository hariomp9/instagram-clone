import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/login";
import Home from "./components/home";
import Registration from "./components/auth/register";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile";
import ChatPage from "./components/chatPage";
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import {  setOnlineUsers } from "./redux/chatSlice";
import { Base_url } from "./utils/config";
import Reels from "./components/ui/Reels";
import CreatePostReels from "./components/ui/CreatePostReels";
import toast from "react-hot-toast";
import { addNotification } from "./redux/Notification/Notification";

function App() {
  const { user_Details } = useSelector((state) => state.Auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_Details) {
      const socketio = io(`${Base_url}`, {
        query: {
          userId: user_Details?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        // console.log(onlineUsers ,"onlineUsers")
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user_Details, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />{" "}
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/Create" element={<CreatePostReels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
