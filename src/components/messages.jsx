import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import MediaView from "./mediaView";
import { DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import DeleteModal from "./messages/delete";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  const { messages } = useSelector((state) => state.Chat);
  const { user_Details } = useSelector((state) => state.Auth);
  const messagesEndRef = useRef(null);
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  useGetAllMessage();
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isRefresh]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenD, setIsOpenD] = useState(false);
  const [id, setID] = useState("");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  function openD() {
    setIsOpenD(true);
  }

  function closeD() {
    setIsOpenD(false);
  }

  return (
    <>
      <div className="overflow-y-auto flex-1 p-4">
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="h-20 w-20">
              <img
                src={selectedUser?.profilePicture}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <span className="font-semibold">{selectedUser?.Username}</span>
            <Link to={`/profile/${selectedUser?._id}`}>
              <Button className="h-8 my-2" variant="secondary">
                View profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Array.isArray(messages) &&
            messages.map((msg, index) => {
              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderId === user_Details?._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="relative">
                    {msg.senderId === user_Details?._id && (
                      <MoreHorizontal
                        onClick={() => {
                          openD(msg._id);
                          setID(msg._id);
                        }}
                        className="cursor-pointer absolute top-[-20px] right-0"
                      />
                    )}

                    <div
                      key={index}
                      className={`p-2 rounded-lg max-w-xs break-words relative ${
                        msg.senderId === user_Details?._id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.message}
                    </div>

                    <button onClick={open}>
                      {(msg.image?.length > 0 ||
                        msg.videos?.length > 0 ||
                        msg.GIF_URL?.length > 0) && (
                        <>
                          {msg.image?.length > 0 && (
                            <img
                              src={msg.image}
                              alt="Image"
                              className="w-40 my-2"
                            />
                          )}

                          {msg.videos?.length > 0 && (
                            <video
                              src={msg.videos}
                              controls
                              className="w-60 my-2"
                            />
                          )}

                          {msg.GIF_URL?.length > 0 && (
                            <img
                              src={msg.GIF_URL}
                              alt="GIF"
                              className="w-40 my-2"
                            />
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* <p>{messages?.message}</p> */}
        </div>
        <div ref={messagesEndRef}></div>
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full border max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Payment successful
              </DialogTitle>

              <MediaView messages={messages} />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isOpenD}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeD}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full border max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                <DeleteModal
                  id={id}
                  refreshData={refreshData}
                  closeD={closeD}
                />
              </DialogTitle>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Messages;
