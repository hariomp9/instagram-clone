import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Base_url } from "@/utils/config";
import toast from "react-hot-toast";
import useGetAllMessage from "@/hooks/useGetAllMessage";

const DeleteModal = ({ id, closeD, refreshData }) => {
  const { token } = useSelector((state) => state.Auth);
  const [isLoading, setLoading] = useState(false);
  console.log(id, "id");
  const handleDelete = () => {
    setLoading(true);
    const options = {
      method: "DELETE",
      url: `${Base_url}/api/v1/message/deleteall`,
      data: { messageIds: [id] },
      headers: {
        Authorization: token,
      },
    };

    axios
      .request(options)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Data removed successfully!");
          refreshData(); // Ensure this triggers re-fetching the data
          closeD(); // Assuming this closes the modal/dialog
        } else {
          toast.error("Data removal failed!");
        }
      })
      .catch((error) => {
        toast.error("Data removal failed!");
        console.error("Error occurred while deleting:", error);
      })
      .finally(() => {
        setLoading(false); // Ensure the loading state is reset in both success and failure
        refreshData(); // Refresh data regardless of success or failure
      });
  };

  return (
    <>
      <div className="mt-2">
        <p className=" text-[16px] font-normal leading-[30px] text-gray-500 mt-4">
          Are you sure you want to delete this message ?
        </p>
      </div>

      <div className="mt-8">
        <div className="flex md:flex-row flex-col gap-3 justify-between gap-x-5">
          <button
            className="w-full border border-red-500 text-red-500 py-[5px] hover:text-red-700 hover:bg-red-100 rounded"
            onClick={closeD}
          >
            No, Keep It
          </button>

          <button
            className={`w-full border border-green-500 text-green-500 py-[5px] hover:text-green-700 hover:bg-green-100 rounded
              ${isLoading ? "text-[gray]" : "delete_btn"}`}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Loading..." : "Yes, Delete It"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
