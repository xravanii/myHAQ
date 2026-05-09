import React from "react";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 h-screen bg-dark-navy text-cream flex flex-col p-6 shadow-2xl">

      <h1 className="text-3xl font-bold mb-12 text-gold-accent">
        MYHAQ AI
      </h1>

      <button 
        onClick={() => setActiveView("home")} 
        className={`py-3 px-4 rounded-lg text-left transition-all duration-300 ${activeView === 'home' ? 'bg-navy text-white shadow-md' : 'hover:bg-navy/50'}`}
      >
        Home
      </button>

      <button 
        onClick={() => setActiveView("ask")} 
        className={`py-3 px-4 rounded-lg text-left transition-all duration-300 mt-2 ${activeView === 'ask' ? 'bg-navy text-white shadow-md' : 'hover:bg-navy/50'}`}
      >
        Ask Question
      </button>

      <button 
        onClick={() => setActiveView("complaint")} 
        className={`py-3 px-4 rounded-lg text-left transition-all duration-300 mt-2 ${activeView === 'complaint' ? 'bg-navy text-white shadow-md' : 'hover:bg-navy/50'}`}
      >
        Complaint Generator
      </button>

      <button 
        onClick={() => setActiveView("resources")} 
        className={`py-3 px-4 rounded-lg text-left transition-all duration-300 mt-2 ${activeView === 'resources' ? 'bg-navy text-white shadow-md' : 'hover:bg-navy/50'}`}
      >
        Resources
      </button>

      <button 
        onClick={() => setActiveView("profile")} 
        className={`py-3 px-4 rounded-lg text-left transition-all duration-300 mt-2 ${activeView === 'profile' ? 'bg-navy text-white shadow-md' : 'hover:bg-navy/50'}`}
      >
        My Profile
      </button>

      <div className="mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full py-3 px-4 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-red-200 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
