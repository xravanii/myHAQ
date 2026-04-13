import React, { useEffect, useState } from "react";

const Profile = () => {
  const [history, setHistory] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/profile/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Unauthorized - please login again");
          return;
        }

        const data = await res.json();
        setHistory(data.history);

        // ✅ Extract email once
        if (data.history.length > 0) {
          setUserEmail(data.history[0].user_email);
        }

      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* 🔷 PROFILE HEADER */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl shadow flex items-center gap-4">
        
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
          {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-semibold">My Profile</h2>
          <p className="text-sm opacity-90">
            {userEmail || "Loading..."}
          </p>
        </div>
      </div>

      {/* 🔷 HISTORY */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Activity History
      </h3>

      {history.length === 0 && (
        <p className="text-gray-500">No history yet.</p>
      )}

      {history.map((item, index) => (
        <div
          key={index}
          className="mb-6 bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
        >
          {/* TYPE BADGE */}
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              item.type === "query"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {item.type.toUpperCase()}
          </span>

          {/* DATE */}
          <p className="text-xs text-gray-400 mt-1">
            {new Date(item.created_at).toLocaleString()}
          </p>

          {/* 🔵 QUERY TYPE */}
          {item.type === "query" && (
            <>
              <h3 className="mt-3 font-semibold text-gray-800">
                {item.question}
              </h3>

              {/* LLM Explanation */}
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  View Explanation
                </summary>

                <p className="mt-2 text-gray-700 whitespace-pre-line">
                  {item.explanation}
                </p>
              </details>

              {/* RAG Sections */}
              <details className="mt-3">
                <summary className="cursor-pointer text-blue-600 font-medium">
                  View Relevant Sections
                </summary>

                {item.sections?.map((sec, i) => (
                  <div key={i} className="mt-2 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-gray-800">
                      {sec.act} Section {sec.section}
                    </p>
                    <p className="text-sm text-gray-600">{sec.title}</p>
                  </div>
                ))}
              </details>
            </>
          )}

          {/* 🟢 COMPLAINT TYPE */}
          {item.type === "complaint" && (
            <>
              <p className="mt-3 text-gray-700">
                Complaint generated for:{" "}
                <strong>{item.complaint_data.full_name}</strong>
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Location: {item.complaint_data.incident_location}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;