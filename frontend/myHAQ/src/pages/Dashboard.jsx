import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import ResultPanel from "../components/ResultPanel";
import ComplaintGenerator from "./ComplaintGenerator"; 
import axios from "axios";
import Profile from "./Profile";
import Resources from "./Resources";

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
        `${import.meta.env.VITE_API_URL}/query/`,
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
    <div className="flex h-screen bg-cream">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex flex-1">
        {/* Center Content */}
        <div className="flex-1 p-10 overflow-y-auto">

          {activeView === "home" && (
            <div className="flex flex-col justify-center h-full px-10">
              
              {/* HERO SECTION */}
              <div className="mb-10 text-center">
                <h1 className="text-6xl font-bold text-dark-navy mb-4">
                  Welcome to <span className="text-gold-accent">MYHAQ AI</span>
                </h1>

                <p className="text-xl text-navy max-w-3xl mx-auto">
                  Making legal knowledge simple, accessible, and understandable for everyone. Your trusted partner in navigating the complexities of the legal world.
                </p>
              </div>

              {/* PROBLEM + SOLUTION */}
              <div className="grid grid-cols-2 gap-8">
                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/50">
                  <h3 className="text-2xl font-semibold mb-4 text-dark-navy">
                    The Problem
                  </h3>
                  <p className="text-navy/80">
                    Legal systems are complex, filled with difficult language, and not easily accessible
                    to common people. Many individuals do not understand their rights or legal options, creating a barrier to justice.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/50">
                  <h3 className="text-2xl font-semibold mb-4 text-dark-navy">
                    Our Solution
                  </h3>
                  <p className="text-navy/80">
                    MYHAQ AI bridges this gap by providing simplified legal explanations,
                    relevant law sections, and tools like complaint generation - all in one place. We empower you with knowledge.
                  </p>
                </div>

              </div>

              {/* FEATURES */}
              <div className="mt-12 bg-navy text-white p-8 rounded-xl shadow-2xl">
                <h3 className="text-3xl font-semibold mb-6 text-center text-gold-accent">
                  What You Can Do
                </h3>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-beige/90">
                  <p className="pl-2 border-l-2 border-gold-accent">Ask legal questions in simple language</p>
                  <p className="pl-2 border-l-2 border-gold-accent">Get relevant IPC sections instantly</p>
                  <p className="pl-2 border-l-2 border-gold-accent">Understand your rights clearly</p>
                  <p className="pl-2 border-l-2 border-gold-accent">Generate complaint letters easily</p>
                </div>
              </div>

            </div>
          )}

          {activeView === "ask" && (
            <div className="max-w-4xl mx-auto">
              
              <h2 className="text-4xl font-bold mb-8 text-dark-navy text-center">
                Ask Your Legal Question
              </h2>

              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200/50">
                
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-4 bg-cream/50 border-2 border-navy/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                  rows="6"
                  placeholder="Describe your legal issue in detail... For example: 'What are the consequences of cheque bounce?'"
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-6 w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-dark-navy transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Analyzing..." : "Get Legal Insights"}
                </button>

              </div>

              {/* LLM OUTPUT */}
              {loading && (
                <div className="mt-8 text-center">
                  <p className="text-navy">Loading, please wait...</p>
                </div>
              )}

              {explanation && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200/50">
                  <h3 className="text-2xl font-semibold text-dark-navy mb-3">
                    Legal Explanation
                  </h3>
                  <ReactMarkdown
                    className="text-navy/90"
                    components={{
                      h1: (props) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                      h2: (props) => <h2 className="text-xl font-bold mt-4 mb-2" {...props} />,
                      h3: (props) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                      h4: (props) => <h4 className="text-base font-bold mt-4 mb-2" {...props} />,
                      p: (props) => <p className="mb-3 last:mb-0" {...props} />,
                      ul: (props) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                      ol: (props) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                    }}
                  >
                    {explanation}
                  </ReactMarkdown>
                </div>
              )}

            </div>
          )}

          {/* ✅ THIS WAS MISSING */}
          {activeView === "complaint" && (
            <ComplaintGenerator />
          )}

          {activeView === "profile" && <Profile />}

          {activeView === "resources" && <Resources />}

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

