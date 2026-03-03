import React from "react";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        MYHAQ AI
      </h1>

      <button
        onClick={() => setActiveView("home")}
        className={`mb-4 text-left transition ${
          activeView === "home"
            ? "text-blue-600 font-medium"
            : "hover:text-blue-600"
        }`}
      >
        Home page
      </button>

      <button
        onClick={() => setActiveView("ask")}
        className={`mb-4 text-left transition ${
          activeView === "ask"
            ? "text-blue-600 font-medium"
            : "hover:text-blue-600"
        }`}
      >
        Ask Question
      </button>

      <button className="mb-4 text-gray-400 cursor-not-allowed">
        Complaint Generator (Soon)
      </button>

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