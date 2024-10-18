import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetUserProfile from "@/hooks/useGetProfile";
import { Button } from "./ui/button";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import LeftSidebar from "./leftSidebar";

const Profile = () => {
  const params = useParams();
  const userId = params?.id;
  const { user_Details } = useSelector((state) => state.Auth);
  const [activeTab, setActiveTab] = useState("Post");
  const { userProfile } = useSelector((state) => state.userAuth);
  const logedInUser = user_Details?._id === userId;
  const isFollowing = true;
  useGetUserProfile(userId);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const displayedPost =
    activeTab === "Post" ? userProfile?.posts : userProfile?.bookmarks;
  return (
    <>
    <div className="flex">
    <div className="w-[16%]">
    <LeftSidebar />
    </div>
      <div className="flex justify-center w-[84%]">
        <div className="flex flex-col mr-0 gap-20 p-5">
          <div className="grid grid-cols-2">
            <section className="flex items-center justify-center gap-20">
              <div>
                <img
                  src={userProfile?.profilePicture}
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>{" "}
            </section>
            <section>
              <div className="flex flex-col  gap-5">
                <div className="flex items-center gap-2">
                  <span>{userProfile?.Username}</span>
                  {logedInUser ? (
                    <>
                      <Link to="/profile/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        {" "}
                        Edit Profile
                      </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        {" "}
                        View archive
                      </Button>
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        {" "}
                        Ad tools
                      </Button>
                    </>
                  ) : isFollowing ? (
                    <>
                      <Button variant="secondary" className="h-6">
                        Unfollow
                      </Button>
                      <Button variant="secondary" className="h-6">
                        Message
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="secondary"
                      className="bg-[#0095F6]  hover:bg-[#2d88c4]   text-white h-6"
                    >
                      Follow
                    </Button>
                  )}
                </div>
                <div className="flex gap-4">
                  <p className="font-semibold">
                    {" "}
                    <span>Post</span> {userProfile?.posts?.length}
                  </p>
                  <p className="font-semibold">
                    {" "}
                    <span>Follower</span> {userProfile?.followers?.length}
                  </p>
                  <p className="font-semibold">
                    {" "}
                    <span>Following</span> {userProfile?.following?.length}
                  </p>
                </div>
                <div>
                  <span className="font-semibold">
                    {userProfile?.bio || "Bio ...."}
                  </span>
                  <Badge variant="secondary" className="w-fit">
                    <AtSign size={"16px"} />
                    <span>{userProfile?.Username}</span>
                  </Badge>
                </div>
                {/* <div className="flex gap-10">
                  <div className="text-center">
                    <p>Post</p>
                    <span>1</span>
                  </div>{" "}
                  <div className="text-center">
                    <p>Followers</p>
                    <span>1</span>
                  </div>{" "}
                  <div className="text-center">
                    <p>Following</p>
                    <span>0</span>
                  </div>{" "}
                </div> */}
              </div>
            </section>
          </div>
          <div className="border-t border-t-gray-200">
            <div className="flex items-center justify-center gap-8 text-sm">
              <span
                onClick={() => handleTabChange("Post")}
                className={`py-3 cursor-pointer ${
                  activeTab === "Post" ? "font-bold" : ""
                }`}
              >
                Post
              </span>
              <span
                onClick={() => handleTabChange("Saved")}
                className={`py-3 cursor-pointer ${
                  activeTab === "Saved" ? "font-bold" : ""
                }`}
              >
                Saved
              </span>
              <span
                onClick={() => handleTabChange("Reels")}
                className={`py-3 cursor-pointer ${
                  activeTab === "Reels" ? "font-bold" : ""
                }`}
              >
                Reels
              </span>
              <span
                onClick={() => handleTabChange("Tags")}
                className={`py-3 cursor-pointer ${
                  activeTab === "Tags" ? "font-bold" : ""
                }`}
              >
                Tags
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1  mx-auto">
              {displayedPost?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className="relative group cursor-pointer"
                  >
                    <img
                      src={post?.image}
                      alt="postimage"
                      className="rounded-sm my-2 w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white space-x-4">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <Heart />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                          <MessageCircle />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default Profile;
