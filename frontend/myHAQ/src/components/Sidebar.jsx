import React from "react";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-6 shadow-sm">
      
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        MYHAQ AI
      </h1>

      {/* Home */}
      <button
        onClick={() => setActiveView("home")}
        className={`mb-4 text-left px-3 py-2 rounded-lg transition ${
          activeView === "home"
            ? "bg-blue-100 text-blue-600 font-medium"
            : "hover:bg-gray-100"
        }`}
      >
        Home
      </button>

      {/* Ask Question */}
      <button
        onClick={() => setActiveView("ask")}
        className={`mb-4 text-left px-3 py-2 rounded-lg transition ${
          activeView === "ask"
            ? "bg-blue-100 text-blue-600 font-medium"
            : "hover:bg-gray-100"
        }`}
      >
        Ask Question
      </button>

      {/* Complaint Generator ✅ FIXED */}
      <button
        onClick={() => setActiveView("complaint")}
        className={`mb-4 text-left px-3 py-2 rounded-lg transition ${
          activeView === "complaint"
            ? "bg-blue-100 text-blue-600 font-medium"
            : "hover:bg-gray-100"
        }`}
      >
        Complaint Generator
      </button>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-red-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;