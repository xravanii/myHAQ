import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ResultPanel from "../components/ResultPanel";
import ComplaintGenerator from "./ComplaintGenerator"; 
import axios from "axios";
import Profile from "./Profile";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [question, setQuestion] = useState("");
  const [sections, setSections] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!question.trim()) {
        alert("Please enter a question");
        return;
      }

      setLoading(true);
      setExplanation("");
      setSections([]);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/query/",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExplanation(response.data.explanation);
      setSections(response.data.sections);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex flex-1">
        {/* Center Content */}
        <div className="flex-1 p-10 overflow-y-auto">

          {activeView === "home" && (
            <div className="flex flex-col justify-center h-full px-10">
              
              {/* HERO SECTION */}
              <div className="mb-10">
                <h1 className="text-5xl font-bold text-blue-600 mb-4">
                  MYHAQ AI
                </h1>

                <p className="text-xl text-gray-700 max-w-2xl">
                  Making legal knowledge simple, accessible, and understandable for everyone.
                </p>
              </div>

              {/* PROBLEM + SOLUTION */}
              <div className="grid grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-red-500">
                    Problem
                  </h3>
                  <p className="text-gray-600">
                    Legal systems are complex, filled with difficult language, and not easily accessible
                    to common people. Many individuals do not understand their rights or legal options.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-green-600">
                    Our Solution
                  </h3>
                  <p className="text-gray-600">
                    MYHAQ AI bridges this gap by providing simplified legal explanations,
                    relevant law sections, and tools like complaint generation - all in one place.
                  </p>
                </div>

              </div>

              {/* FEATURES */}
              <div className="mt-10 bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  What You Can Do
                </h3>

                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <p>- Ask legal questions in simple language</p>
                  <p>- Get relevant IPC sections instantly</p>
                  <p>- Understand your rights clearly</p>
                  <p>- Generate complaint letters easily</p>
                </div>
              </div>

            </div>
          )}

          {activeView === "ask" && (
            <div className="max-w-3xl mx-auto">
              
              <h2 className="text-3xl font-semibold mb-6 text-blue-600">
                Ask Your Legal Question
              </h2>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  placeholder="Describe your legal issue in detail..."
                />

                <button
                  onClick={handleSubmit}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  {loading ? "Analyzing..." : "Submit"}
                </button>

              </div>

              {/* LLM OUTPUT */}
              {explanation && (
                <div className="mt-6 bg-green-50 p-5 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Explanation
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {explanation}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ✅ THIS WAS MISSING */}
          {activeView === "complaint" && (
            <ComplaintGenerator />
          )}

          {activeView === "profile" && <Profile />}

        </div>

        {/* Right Panel ONLY for Ask */}
        {activeView === "ask" && (
          <ResultPanel sections={sections} />
        )}

      </div>
    </div>
  );
};

export default Dashboard;

