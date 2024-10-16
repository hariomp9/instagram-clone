import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setUserProfile } from "@/redux/authSlice";
import { Base_url } from "@/utils/config";
import { userDetails } from "@/redux/slice";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { userProfile } = useSelector((state) => state.userAuth);
  const { user_Details } = useSelector((state) => state.Auth);
  const { token } = useSelector((state) => state.Auth);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePicture: userProfile?.profilePicture,
    bio: userProfile?.bio,
    gender: userProfile?.gender,
  });
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePicture: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    // console.log(input);
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePicture) {
      formData.append("profilePicture", input.profilePicture);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${Base_url}/api/v1/Auth/edit-profile/${user_Details?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...userProfile,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user.gender,
        };

        dispatch(setUserProfile(updatedUserData));
        dispatch(userDetails(updatedUserData));
        navigate(`/profile/${user_Details?._id}`);
        toast.success(res.data.message || "Success");
      }
    } catch (error) {
      console.log(error, "Error");
      toast.error(error.response.data.messasge || "Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster />
      <div className="flex max-w-2xl mx-auto pl-10">
        <section className="flex flex-col gap-6 w-full my-8">
          <h1 className="font-bold text-xl">Edit Profile</h1>
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <img
                src={userProfile.profilePicture}
                alt="post_image"
                className="w-60"
              />
              <div>
                <h1 className="font-bold text-sm">{userProfile.username}</h1>
                <span className="text-gray-600">
                  {userProfile.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <Button
              onClick={() => imageRef?.current.click()}
              className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
            >
              Change photo
            </Button>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2">Bio</h1>
            <Textarea
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
              name="bio"
              className="focus-visible:ring-transparent"
            />
          </div>
          <div>
            <h1 className="font-bold mb-2">Gender</h1>
            <Select
              defaultValue={input.gender}
              onValueChange={selectChangeHandler}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={editProfileHandler}
                className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
              >
                Submit
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default EditProfile;
