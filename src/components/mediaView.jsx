import React from "react";

const MediaView = ({ messages }) => {
    console.log(messages , "messss")
  return (
    <>
      <div>
        <img src={messages.image} alt="Image" className="" />
      </div>
    </>
  );
};

export default MediaView;
