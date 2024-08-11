import React from "react";

const DashboardContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Total Blogs</h3>
      <p className="text-3xl font-bold">150</p>
    </div>
    <div className="bg-green-100 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Total Users</h3>
      <p className="text-3xl font-bold">1,250</p>
    </div>
    <div className="bg-yellow-100 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">New Comments</h3>
      <p className="text-3xl font-bold">25</p>
    </div>
  </div>
);

export default DashboardContent;
