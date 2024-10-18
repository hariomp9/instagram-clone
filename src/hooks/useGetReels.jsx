import { Base_url } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setReels } from "@/redux/ReelsSlice";

const useGetReels = () => {
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = useState(false);

  const refreshData = () => {
    setRefresh(!isRefresh);
  };

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await axios.get(`${Base_url}/api/v1/Reels/GetReel`);
        console.log(response,"==================================")
  
        if (response.data.data) {
          console.log("Dispatching Reels Data:", response.data.data); // Log what you're dispatching
          dispatch(setReels(response.data.data)); // Ensure you're dispatching the full array of reels
        }
      } catch (error) {
        console.log(error, "Error");
      }
    };
  
    fetchAllPost();
  }, [isRefresh, dispatch]);
  

  return { refreshData }; 
};

export default useGetReels;
