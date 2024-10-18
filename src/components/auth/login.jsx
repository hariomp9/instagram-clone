import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, userDetails } from "@/redux/slice";
import { Base_url } from "@/utils/config";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/utils/loader";
import { setUserProfile } from "@/redux/authSlice";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const [isLoader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!userDetail.email || !userDetail.password) {
      setLoader(false);
      setError("Both email and password are required");
      return;
    }
    try {
      const response = await axios.post(
        `${Base_url}/api/v1/Auth/login`,
        userDetail
      );

      if (response.status === 200) {
        dispatch(setToken(response.data.token));
        dispatch(userDetails(response.data.user));
        dispatch(setUserProfile(response.data.user));
        toast.success("Login Success");
        navigate("/home");
      }
    } catch (err) {
      // Handle error from API or network issues 
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <>
     <Toaster />
      {isLoading && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className=" border w-1/4 text-center px-5 rounded-[10px]">
          <form onSubmit={handleSubmit} className="   mx-auto">
            <div className="text-center">
              <img
                //  src="https://www.pngplay.com/wp-content/uploads/12/Instagram-Logo-No-Background.png"
                className="w-[50%] mx-auto"
              />
              <h1 className="font-semibold text-[22px] my-1">Login</h1>
            </div>
            <div className="my-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetail.email}
                onChange={handleChange}
                className="py-2 px-2 text-[14px] outline-none w-full rounded border"
              />
            </div>
            <div className="my-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userDetail.password}
                onChange={handleChange}
                className="py-2 px-2 text-[14px] outline-none w-full rounded border"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              type="submit"
              disabled={isLoader}
              className="w-full text-center border text-white bg-blue-600 py-2 rounded"
            >
              {isLoader ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="py-2">
            Create a new account{" "}
            <Link to="/registration">
              <span className="text-blue-600">Register</span>
            </Link>{" "}
          </p>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default LogIn;

//Setup
// dispatch(setToken("Hello"))
// dispatch(userDetails("Users"))

//Remove
// dispatch(removeToken());
// dispatch(removeUsersDetails());
