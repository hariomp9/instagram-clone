import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import notificationSound from "../assets/Jai Shree Ram Notification Tone Ringtone Download - MobCup.Com.Co.mp3";
import { addLikeNotify, clearLikeNotify } from "@/redux/Notification/likeSlice";

const useGetLike = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socketio);

  useEffect(() => {
    let audio = new Audio(notificationSound); // Initialize audio once

    const playSound = () => {
      audio.currentTime = 0; // Reset to start for each play
      audio
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
    };

    if (socket) {
      // Listen for new messages from the socket
      socket.on("notification", (notification) => {
        dispatch(
          addLikeNotify({
            id: notification.PostId,
            message: notification.message,
            userProfile: notification.userDetails.profilePicture,
            timestamp: new Date().toISOString(),
          })
        );
        toast(`${notification.message}`, {
          icon: (
            <img
              src={notification.userDetails.profilePicture}
              alt=""
              className="w-6 h-6 rounded-full"
            />
          ),
        });
       console.log("lelo")

        playSound();
        dispatch(clearLikeNotify());
      });

      return () => {
        console.log("called")
        socket.off("notification");
      };
    }
  }, [socket, dispatch]);

  return null;
};

export default useGetLike;
