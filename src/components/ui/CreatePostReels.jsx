import React, { useState } from "react";
import LeftSidebar from "../leftSidebar";
import CreatePost from "../createPost";
import CreateReel from "../CreateReel";

const CreatePostReels = () => {
  const [open, setOpen] = useState(false); // Manage Create Post visibility
  const [open1, setOpen1] = useState(false); // Manage Create Reel visibility

  return (
    <>
      <LeftSidebar />
      <div className="flex ml-[16%] mt-5 justify-center items-center gap-3">
        <button 
          className="p-4 bg-green-500" 
          onClick={() => setOpen(true)}
        >
          Create Post
        </button>
        <button 
          className="p-4 bg-green-500" 
          onClick={() => setOpen1(true)}
        >
          Create Reel
        </button>
      </div>

      {open && <CreatePost setOpen={setOpen} open={open} />}
      {open1 && <CreateReel setOpen1={setOpen1} open1={open1} />}
    </>
  );
};

export default CreatePostReels;
