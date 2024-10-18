import React, { useState } from "react";
import axios from "axios";
import { Base_url } from "@/utils/config";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/utils/loader";
import toast from "react-hot-toast";

const Registration = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Username: "",
    password: "",
    profilePicture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("Username", formData.Username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profilePicture", formData.profilePicture);

    try {
      const response = await axios.post(
        `${Base_url}/api/v1/Auth/Register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Registration successful!");
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      setErrorMessage("Error occurred during registration. Please try again.");
      toast.error(error.response.error.message || "Register Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex items-center h-screen">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <div className="text-center">
              <img
                // src="https://www.pngplay.com/wp-content/uploads/12/Instagram-Logo-No-Background.png"
                className="w-[50%] mx-auto"
              />
              <h1 className="font-semibold text-[22px]  my-1">SignUp</h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="Username"
                value={formData.Username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="submit-btn bg-blue-600">
              Register
            </button>
          </form>
          <div className="text-center">
            <p className="py-2">
              You have an account?{" "}
              <Link to="/">
                <span className="text-blue-600">Login</span>
              </Link>{" "}
            </p>
          </div>{" "}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Registration;

// "user": {
//   "email": "hariom9@gmail.com",
//   "password": "$2a$10$lA5Tz2zvRb.H51ciKsx0AOqZpyi6z7K8SaFrXg0Ux/hxLOymerH4u",
//   "profilePicture": "https://res.cloudinary.com/dlpcyh1ac/image/upload/v1727773012/hvigf5vk2xd03eew3psf.jpg",
//   "bio": "",
//   "followers": [],
//   "following": [],
//   "posts": [],
//   "bookmarks": [],
//   "_id": "66fbb955603149976de709bc",
//   "createdAt": "2024-10-01T08:56:53.373Z",
//   "updatedAt": "2024-10-01T08:56:53.373Z",
//   "__v": 0,
//   "tokenExpiry": "2024-10-08T08:56:53.818Z"
// }
// }
