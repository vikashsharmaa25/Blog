import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <Link to={"https://vikashsharma.vercel.app/"}>
          <button className="text-xl px-5 py-1 rounded-md text-white font-serif bg-indigo-600">
            Portfolio
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
