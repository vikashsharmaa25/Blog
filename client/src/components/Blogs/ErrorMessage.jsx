import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="p-4 text-center text-white bg-red-600 rounded-lg">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
