import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetReels from "@/hooks/useGetReels"; // Assuming this fetches reels
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LeftSidebar from "../leftSidebar";

const Reels = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.reels.Reels);
  const [loading, setLoading] = useState(true);

  useGetReels();

  useEffect(() => {
    if (reels.length > 0) setLoading(false);
  }, [reels]);

  return (
    <>
      <LeftSidebar />
      <section className="reel__container ml-[16%]">
        <div className="reel__title flex justify-between items-center p-4"></div>

        <div className="reel__content flex justify-center items-center h-screen overflow-hidden">
          <div className="flex flex-col items-center w-full h-full overflow-y-scroll">
            {loading ? (
              <div className="mt-8 w-[40%]">
                <Skeleton height={500} width="100%" className="rounded" />
                <Skeleton height={20} className="mt-2" />
                <Skeleton height={15} width="60%" />
              </div>
            ) : reels.length > 0 ? (
              <div className="w-full h-full flex flex-col items-center space-y-8 pt-8">
                {reels.map((reel) => (
                  <div
                    key={reel._id}
                    className=" w-[40%] p-4 rounded-lg shadow-lg flex flex-col items-center relative"
                  >
                    {/* Video Container */}
                    <div className="relative w-full h-[70vh]">
                      <video
                        src={reel.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Reel Options positioned over the video */}
                      <div className="reel__options absolute bottom-4 right-4 flex flex-col space-y-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-heart w-8 h-8 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                        <p className="reel__likes text-white">1.307</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-message-circle w-8 h-8 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-send w-8 h-8 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24V24H0z" fill="none" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                          <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dots-vertical w-8 h-8 text-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="19" r="1" />
                          <circle cx="12" cy="5" r="1" />
                        </svg>
                      </div>
                    </div>

                    <div className="reel__desc mt-4 w-full absolute bottom-4 left-8">
                      <div className="reel__user flex items-center space-x-4">
                        <img
                          src={
                            reel.likes[0]?.profilePicture ||
                            "https://i.ibb.co/x36chgX/Untitled.png"
                          }
                          className="reel__avatar w-10 h-10 rounded-full"
                          alt="User Avatar"
                        />
                        <p className="reel__username font-semibold">
                          {reel.likes[0]?.Username || "Anonymous"}
                        </p>
                        <button className="ml-auto text-blue-500">Follow</button>
                      </div>

                      <p className="reel__caption mt-2 text-gray-700">
                        {reel.caption || "No caption available"}
                      </p>

                      <div className="reel__audio flex items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-tallymark-3"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="8" y1="7" x2="8" y2="17" />
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="16" y1="7" x2="16" y2="17" />
                        </svg>
                        <p className="ml-2 text-gray-500">
                          AJR • The Good Part
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reels found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Reels;
