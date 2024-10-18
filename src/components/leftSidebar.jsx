import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Base_url } from "@/utils/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  removeToken,
  removeUsersDetails,
  setSuggestedUsers,
} from "@/redux/slice";
import { useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import Loader from "@/utils/loader";
import { setPosts } from "@/redux/postSlice";

import { Toaster } from "react-hot-toast";
import CreateReel from "./CreateReel";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";
import { setUserProfile } from "@/redux/authSlice";


const LeftSidebar = () => {
  const { token, user_Details } = useSelector((state) => state.Auth);
  const { likeNotification } = useSelector(
    (state) => state.realTimeNotification
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // Post modal
  const [open1, setOpen1] = useState(false); // Reel modal
  const [isLoading, setLoading] = useState(false);

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Reels" },
    { icon: <MessageCircle />, text: "Message" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user_Details?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/Auth/logout`,
        {},
        {
          headers: { authorization: token },
        }
      );

      if (response.status === 200) {
        toast.success("Logout Successfully");
        dispatch(removeToken(""));
        dispatch(setSuggestedUsers(""));
        dispatch(setPosts(""));
        dispatch(removeUsersDetails());
        dispatch(setUserProfile(""))
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const sidebarHandler = (text) => {
    switch (text) {
      case "Logout":
        handleLogout();
        break;
      case "Create":
        navigate("/create");
        break;
      case "Profile":
        navigate(`/profile/${user_Details?._id}`);
        break;
      case "Home":
        navigate("/home");
        break;
      case "Message":
        navigate("/chat");
        break;
      case "Reels":
        navigate("/Reels");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Toaster />
      {isLoading && <Loader />}
      <div className=" fixed top-0 z-10 left-0  border-r border-gray-300 w-[16%] h-screen">
        <div className="flex flex-col overflow-y-scroll h-screen overflow-hidden px-4 relative scrollbarHidden">
          <div className="bg-white z-20">
            {/* <img
              src="https://www.pngplay.com/wp-content/uploads/12/Instagram-Logo-No-Background.png"
              className="w-[12%] mx-auto fixed bg-white "
            /> */}
          </div>
          <div className="pt-[30px] xl:pt-[50px] 2xl:pt-[80px]">
            {sidebarItems.map((item, index) => {
              return (
                <div
                  onClick={() => sidebarHandler(item?.text)}
                  key={index}
                  className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-[6px] 2xl:my-2"
                >
                  {item.icon}
                  <span>{item.text}</span>
                  {item.text === "Notifications" &&
                    likeNotification?.message > 0 && (
                      <div>
                        {alert("come")}
                        <div>
                          <button
                            size="icon"
                            className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                          >
                            {likeNotification?.message}
                          </button>
                        </div>
                        <div>
                          <div>
                            {likeNotification?.message === 0 ? (
                              <p>No new notification</p>
                            ) : (
                              likeNotification?.map((notification) => {
                                return (
                                  <div
                                    key={notification?.userId}
                                    className="flex items-center gap-2 my-2"
                                  >
                                    <Avatar>
                                      <AvatarImage
                                        src={
                                          notification?.userDetails
                                            ?.profilePicture
                                        }
                                      />
                                      <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm">
                                      <span className="font-bold">
                                        {notification?.userDetails?.username}
                                      </span>{" "}
                                      liked your post
                                    </p>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
        <CreatePost setOpen={setOpen} open={open} />
        <CreateReel setOpen1={setOpen1} open1={open1} />
      </div>
    </>
  );
};

export default LeftSidebar;
