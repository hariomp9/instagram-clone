import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.Auth);
  const { userProfile } = useSelector((state) => state.userAuth);
  // const filteredIds = userProfile?.following?.map(
  //   (followingUser) => followingUser?._id
  // );
  // console.log(filteredIds ,"filteredIds")
  // const suggestedUsersIds = suggestedUsers?.map(
  //   (suggestedUser) => suggestedUser?._id
  // );
  // console.log(suggestedUsersIds,"suggestedUsersIds")
  // const postId = suggestedUsers?._id;
  // const isFollowing = filteredIds.includes(postId);

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      <div>
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
                      {user?.bio || "Hello"}
                    </span>
                  </div>
                  {/* <div>
                    {isFollowing ? (
                      <button
                        // onClick={() => handleUnfollow(suggestedUser?._id)}
                        className="text-red-700 font-[600] outline-none"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        // onClick={() => handleFollow(suggestedUser?._id)}
                        className="text-[#4CB5F9] font-[600] p-2 outline-none"
                      >
                        Follow
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            );
          })}
        <div></div>
      </div>
    </div>
  );
};

export default SuggestedUsers;

// {suggestedUsers?.map((suggestedUser) => {
//   const isFollowing = filteredIds?.includes(suggestedUser?._id);

//   <div key={suggestedUser?._id} className="suggested-user">
//     <p>{suggestedUser?.name}</p>
//     {isFollowing ? (
//       <button
//         // onClick={() => handleUnfollow(suggestedUser?._id)}
//         className="text-red-700 font-[600] outline-none"
//       >
//         Unfollow
//       </button>
//     ) : (
//       <button
//         // onClick={() => handleFollow(suggestedUser?._id)}
//         className="text-[#4CB5F9] font-[600] p-2 outline-none"
//       >
//         Follow
//       </button>
//     )}
//   </div>;
// })}
