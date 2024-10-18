import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetReels from "@/hooks/useGetReels"; // Assuming this fetches reels
import LeftSidebar from "../leftSidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Reels = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.reels.Reels);
  const [loading, setLoading] = useState(true);

  useGetReels();

  useEffect(() => {
    if (reels.length > 0) setLoading(false);
    console.log("Reels:", reels);
  }, [reels]);

  return (
    <>
      <LeftSidebar />
      <div className="flex justify-center items-center h-screen overflow-hidden">
        <div className="flex flex-col items-center w-full h-full overflow-y-scroll">
          <h1 className="text-2xl font-bold mt-4">Reels</h1>

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
                  className="bg-white w-[40%] p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <video
                    src={reel.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-[70vh] object-cover rounded-lg"
                  />
                  <div className="flex flex-row gap-20 mt-2  justify-between items-center">
                    <p className=" font-semibold">{reel.caption}</p>
                    <span className="text-sm text-gray-500">
                      Posted on {new Date(reel.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8">No reels available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Reels;
