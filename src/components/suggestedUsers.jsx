import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.Auth);
  console.log(suggestedUsers, "suggestedUsers");
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {Array.isArray(suggestedUsers) &&
        suggestedUsers?.map((user) => {
          return (
            <div
              key={user._id}
              className="flex items-center justify-between my-5"
            >
              <div className="flex items-center gap-2">
                <Link to={`/profile/${user?._id}`}>
                  <img
                    src={user?.profilePicture}
                    alt="post_image"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                <div>
                  <h1 className="font-semibold text-sm">
                    <Link to={`/profile/${user?._id}`}>{user?.Username}</Link>
                  </h1>
                  <span className="text-gray-600 text-sm">
                    {user?.bio || "Bio here..."}
                  </span>
                </div>
              </div>
              <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]">
                Follow
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default SuggestedUsers;
