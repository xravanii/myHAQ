import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ResultPanel from "../components/ResultPanel";
import axios from "axios";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [question, setQuestion] = useState("");
  const [sections, setSections] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

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

      // 🔹 LLM explanation below chat box
      setExplanation(response.data.explanation);

      // 🔹 IPC sections in right panel
      setSections(response.data.sections);

    } catch (error) {
      console.error(error);
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
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Welcome to MYHAQ AI
              </h2>
              <p className="text-gray-600">
                Your intelligent legal assistant for understanding IPC sections
                and legal rights.
              </p>
            </div>
          )}

          {activeView === "ask" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold mb-6">
                Ask Your Legal Question
              </h2>

              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
                placeholder="Describe your legal issue in detail..."
              />

              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                {loading ? "Analyzing..." : "Submit"}
              </button>

              {/*  LLM Explanation Below Chat Box */}
              {explanation && (
                <div className="mt-6 bg-blue-50 p-5 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    Legal Explanation
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Panel for IPC Sections */}
        <ResultPanel sections={sections} />
      </div>
    </div>
  );
};

export default Dashboard;