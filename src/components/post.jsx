import React, { useState } from "react";
import { Avatar } from "./ui/Avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./commentDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_url } from "@/utils/config";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { IoIosSend } from "react-icons/io";
import useGetUserProfile from "@/hooks/useGetProfile";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.Auth);
  const { user_Details } = useSelector((state) => state.Auth);
  const { userProfile } = useSelector((state) => state.userAuth);

  const { posts } = useSelector((state) => state.Post);
  const [liked, setLiked] = useState(
    post?.likes?.includes(user_Details?._id) || false // initialize based on user ID
  );
  const [postLike, setPostLike] = useState(post?.likes?.length);
  const [comment, setComment] = useState("");
  const [isRefresh, setRefresh] = useState(false);
  const refreshData = () => {
    setRefresh(!isRefresh);
  };
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const likeDislike = async (_id) => {
    try {
      const action = liked ? "Dislike" : "Like";

      const response = await axios.post(
        `${Base_url}/api/v1/postAuth/${action}/${post?._id}`,
        {},
        {
          headers: {
            Authorization: token, 
          },
        }
      );

      if (response.data.success) {
        toast.success(`${action}d` || "success");
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user_Details._id)
                  : [...p.likes, user_Details._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
      } else {
        toast.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while updating"
      );
    }
  };
  const handleComment = async (id) => {
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/postAuth/AddComment/${id}`,
        {
          text: comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Success");
        setComment("");
        refreshData();

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    _id: user_Details._id,
                    text: comment, // Adding the comment text
                    username: user_Details.username, // Adding the username or any other user detail you want to store
                  },
                ],
              }
            : p
        );

        dispatch(setPosts(updatedPostData));
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.log(error.response.data.message || "Failed");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${Base_url}/api/v1/postAuth/deletePost/${post?._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        const updatePostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        dispatch(setPosts(updatePostData));
        toast.success("Delete Successful");
        setOpen(false);
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log(error, "Error");
      toast.error(error.response.data.message || "Failed");
    } finally {
      setOpen(false);
    }
  };

  const handleFollow = async (id) => {
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/Auth/followAndUnfollow/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message || "Success");
        refreshData();
      } else console.log("Failed");
    } catch (error) {
      toast.error(error, "Error");
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.post(
        `${Base_url}/api/v1/postAuth/BookMark/${post?._id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message || "success");
      }
    } catch (error) {
      console.log(error ,"Error");
    }
  };

  return (
    <>
     <Toaster />
      <div className="my-8 w-full max-w-[400px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${post?.author?._id}`}>
              <Avatar className="border">
                <AvatarImage
                  src={post?.author?.profilePicture}
                  alt="post_image"
                  className="w-10 h-10"
                ></AvatarImage>
              </Avatar>
            </Link>
            <Link to={`/profile/${post?.author?._id}`}>
              <h1>{post?.author?.Username}</h1>
            </Link>
          </div>
          <div className="flex gap-3">
            {/* {post?.author?._id === userProfile?.following[3]?._id ? (
              <button
              onClick={() => handleFollow(post?.author?._id)}
              className="text-[#4CB5F9] font-[600]"
            >
              Followwwww
            </button>
            ) : (
              <button
                onClick={() => handleFollow(post?.author?._id)}
                className="text-[#4CB5F9] font-[600]"
              >
                Follow
              </button>
            )} */}
            {/* {userProfile._id === post?.author?._id ? (
              ""
            ) : (
            
            )} */}
            <div>
              <div>
                {user_Details?.following?.some(
                  (followingUser) => followingUser._id === post?.author?._id
                ) ? (
                  <button
                    onClick={() => handleFollow(post?.author?._id)}
                    className="text-red-700 font-[600]"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(post?.author?._id)}
                    className="text-[#4CB5F9] font-[600]"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <MoreHorizontal className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                {userProfile._id === post?.author?._id ? (
                  ""
                ) : (
                  <div>
                    {userProfile?.following?.some(
                      (followingUser) => followingUser._id === post?.author?._id
                    ) ? (
                      ""
                    ) : (
                      <div className="flex justify-center">
                        {userProfile?.following?.some(
                          (followingUser) =>
                            followingUser._id === post?.author?._id
                        ) ? (
                          <button
                            onClick={() => handleFollow(post?.author?._id)}
                            className="text-red-700 font-[600]"
                          >
                            Unfollow
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFollow(post?.author?._id)}
                            className="text-[#4CB5F9] font-[600]"
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <button>Add to favorite</button>

                {user_Details?._id === post?.author?._id && (
                  <button onClick={handleDelete} className="text-red-700">
                    Delete
                  </button>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <img
          className="rounded-sm my-1 aspect-square object-cover"
          src={post?.image}
          alt="post-image"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 items-center">
            {/* <FaRegHeart size={"20px"} onClick={likeDislike} /> */}

            {liked ? (
              <FaHeart
                size={"20px"}
                onClick={likeDislike}
                className="text-red-700 cursor-pointer"
              />
            ) : (
              <FaRegHeart
                size={"20px"}
                onClick={likeDislike}
                className="cursor-pointer"
              />
            )}

            <MessageCircle
              size={"20px"}
              onClick={() => {
                dispatch(setSelectedPost(post));
                setOpen(true);
              }}
              className="cursor-pointer hover:text-gray-600 cursor-pointer"
            />
            <Send
              size={"20px"}
              className="cursor-pointer hover:text-gray-600 cursor-pointer"
            />
          </div>
          <Bookmark
            onClick={bookmarkHandler}
            size={"20px"}
            className="cursor-pointer hover:text-gray-600"
          />
        </div>
        <span className="">{postLike} Likes</span>
        <p>
          <span className="font-medium mr-2">{post?.author?.Username}</span>
          {post?.caption}
        </p>
        <div className="my-1">
          <span
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className=" cursor-pointer text-gray-400 "
          >
            View all comments
          </span>
        </div>
        <CommentDialog
          post={post}
          open={open}
          setOpen={setOpen}
          postId={post?._id}
          postImage={post?.image}
          postAuthor={post?.author}
          postComments={post?.comments}
        />
        <div className="flex border p-1 rounded">
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={changeEventHandler}
            className="outline-none tetx-sm w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => handleComment(post?._id)}>
            {comment && (
              <span className="">
                {" "}
                <IoIosSend size={"20px"} />
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
