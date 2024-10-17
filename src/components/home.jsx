import React from "react";
import Feed from "./feed";
import RightSidebar from "./rightSidebar";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./leftSidebar";
import protectedRoute from "@/utils/protectRout";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUser from "@/hooks/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUser();
  return (
    <>
      <div className=" grid grid-cols-3 w-[100%]">
        <div>
          <LeftSidebar />
        </div>{" "}
        <div className="">
          <Feed />
          <Outlet />
        </div>
        <div className="">
          <RightSidebar />
        </div>{" "}
      </div>
    </>
  );
};

export default protectedRoute(Home);
