import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: user?.password || "",
  });

  return (
    <div className="max-w-[1350px] mx-auto mt-10">
      <div className="max-w-[600px] mx-auto  flex flex-col justify-center items-center p-2">
        <div className="w-full mt-5">
          <input
            type="text"
            className="w-full p-2 rounded-lg font-medium text-gray-600"
            value={formData.email}
          />
        </div>
        <div className="w-full mt-5">
          <input
            type="password"
            className="w-full p-2 rounded-lg font-medium text-gray-600"
            value={formData.password}
          />
        </div>
        <div className="w-full mt-5 bg-yellow-400">
          <button className="w-full p-2 rounded-lg uppercase font-medium">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
