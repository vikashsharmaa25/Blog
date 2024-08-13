import React from "react";
import { ImSpinner9 } from "react-icons/im";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-900 to-black">
      <ImSpinner9 className="w-16 h-16 text-pink-500 animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
