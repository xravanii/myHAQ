import React from "react";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col p-6">

      <h1 className="text-2xl font-bold mb-10">
        MYHAQ AI
      </h1>

      <button onClick={() => setActiveView("home")} className="mb-4 text-left hover:opacity-80">
        Home
      </button>

      <button onClick={() => setActiveView("ask")} className="mb-4 text-left hover:opacity-80">
        Ask Question
      </button>

      <button onClick={() => setActiveView("profile")} className="mb-4 text-left hover:opacity-80">
        My Profile
      </button>

      <button onClick={() => setActiveView("complaint")} className="mb-4 text-left hover:opacity-80">
        Complaint Generator
      </button>

      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-red-300 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
