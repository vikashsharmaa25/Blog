import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { message, Spin } from "antd";
import { setAuthUser } from "../../redux/slices/authSlice";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    gender: user?.gender || "",
    profileImage: user?.profilePicture || "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setFormData({ ...formData, profileImage: upload.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("gender", formData.gender);

    if (formData.profileImage) {
      const blob = await fetch(formData.profileImage).then((res) => res.blob());
      formDataToSend.append("profilePicture", blob);
    }

    try {
      const response = await axios.put(
        "/api/user/profile/edit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        message.success("Profile updated successfully!");
        dispatch(setAuthUser(response.data.user));
        setFormData({
          bio: response.data.user.bio,
          gender: response.data.user.gender,
          profileImage: response.data.user.profilePicture,
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1350px] mx-auto mt-10 min-h-screen">
      <div className="max-w-[600px] mx-auto flex flex-col justify-center items-center p-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex flex-col items-center w-full mt-5">
            <label htmlFor="profileImage" className="cursor-pointer">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="object-cover w-24 h-24 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-500" />
              )}
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-full mt-5">
            <input
              type="text"
              name="bio"
              className="w-full p-2 font-medium text-gray-600 rounded-lg"
              placeholder="Enter bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full mt-5">
            <input
              type="text"
              name="gender"
              className="w-full p-2 font-medium text-gray-600 rounded-lg"
              placeholder="Enter gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full mt-5 bg-yellow-400">
            <button
              type="submit"
              className="w-full p-2 font-medium uppercase rounded-lg"
              disabled={loading}
            >
              {loading ? "updating..." : "  Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
