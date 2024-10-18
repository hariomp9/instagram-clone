import { Dialog, Textarea, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { DialogHeader } from "./ui/dialog";
import { useSelector } from "react-redux";
import { Base_url } from "@/utils/config";

const CreateReel = ({ open1, setOpen1 }) => {
  const [caption, setCaption] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.Auth);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async () => {
    if (!videoFile || !caption) {
      toast.error("Please provide both a video and caption!");
      return;
    }

    const formData = new FormData();
    formData.append("videoUrl", videoFile);
    formData.append("caption", caption);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${Base_url}/api/v1/Reels/Create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Reel created successfully!");
        setOpen1(false);
        setCaption("");
        setVideoFile(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create reel.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Transition show={open1} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen1(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <div className="flex items-center  justify-center  p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6  bg-white rounded-lg shadow-lg scrollbarThin ">
                  <DialogHeader className="text-center font-semibold">
                    Create New Reel
                  </DialogHeader>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="mt-4"
                  />
                  <Textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-2 mt-4 border rounded"
                  />
                  <button
                    onClick={handleSubmit}
                    className={`w-full mt-4 py-2 rounded bg-blue-600 text-white ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Create Reel"}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateReel;
