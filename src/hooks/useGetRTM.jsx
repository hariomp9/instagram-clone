// import { setMessages } from "@/redux/chatSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetRTM = () => {
//   const dispatch = useDispatch();
//   const { socket } = useSelector((state) => state.socketio);
//   const { messages } = useSelector((state) => state.Chat);
//   useEffect(() => {
//     // newMessage
//     socket?.on("newMessage", (newMessage) => {
//       dispatch(setMessages([...messages, newMessage]));
//     });

//     return () => {
//       socket?.off("newMessage");
//     };
//   }, [messages, setMessages]);
// };
// export default useGetRTM;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/chatSlice";
import { addNotification } from "@/redux/Notification/Notification";
import toast, { Toaster } from "react-hot-toast";
import notificationSound from '../assets/Jai Shree Ram Notification Tone Ringtone Download - MobCup.Com.Co.mp3';

const useGetRTM = () => {
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
      socket.on("newMessage", (newMessage) => {
        console.log("New message received:", newMessage);

        // Add the new message to the Redux store
        dispatch(addMessage(newMessage));

        // Play the notification sound
        playSound();
      });

      // Listen for message notifications from the socket
      socket.on("messageNotification", (notification) => {
        console.log("Message notification received:", notification);

        // Add the notification to the Redux store
        dispatch(
          addNotification({
            id: notification.messageId,
            message: notification.notificationMessage,
            sender: notification.senderDetails.Username,
            senderPicture: notification.senderDetails.profilePicture,
            timestamp: new Date().toISOString(),
          })
        );

        // Show toast notification
        toast(
          `${notification.senderDetails.Username}: ${notification.notificationMessage}`,
          {
            icon: (
              <img
                src={notification.senderDetails.profilePicture}
                alt=""
                className="w-6 h-6 rounded-full"
              />
            ),
          }
        );

      
        playSound();
      });

      return () => {
        socket.off("newMessage");
        socket.off("messageNotification");
      };
    }
  }, [socket, dispatch]);

  return null;
};

export default useGetRTM;
