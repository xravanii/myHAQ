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
      <div className="mb-10 bg-navy text-white p-8 rounded-xl shadow-2xl flex items-center gap-6">
        
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gold-accent text-dark-navy flex items-center justify-center font-bold text-2xl">
          {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-3xl font-bold">My Profile</h2>
          <p className="text-lg text-beige opacity-90">
            {userEmail || "Loading..."}
          </p>
        </div>
      </div>

      {/* 🔷 HISTORY */}
      <h3 className="text-2xl font-bold mb-6 text-dark-navy">
        My Activity History
      </h3>

      {history.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl shadow-md border">
          <p className="text-navy/70">You have no activity history yet.</p>
          <p className="text-sm text-navy/50 mt-2">Ask a question or generate a complaint to get started.</p>
        </div>
      )}

      {history.map((item, index) => (
        <div
          key={index}
          className="mb-6 bg-white shadow-lg rounded-xl p-6 border border-navy/10 hover:shadow-xl hover:border-gold-accent/50 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            {/* TYPE BADGE */}
            <span
              className={`text-xs px-4 py-1 rounded-full font-semibold tracking-wider ${
                item.type === "query"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {item.type.toUpperCase()}
            </span>

            {/* DATE */}
            <p className="text-xs text-navy/50">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>

          {/* 🔵 QUERY TYPE */}
          {item.type === "query" && (
            <>
              <h3 className="mt-4 font-semibold text-lg text-navy">
                {item.question}
              </h3>

              {/* LLM Explanation */}
              <details className="mt-4 group">
                <summary className="cursor-pointer text-gold-accent font-semibold group-open:mb-2">
                  View Explanation
                </summary>

                <p className="mt-2 text-navy/80 whitespace-pre-line border-l-4 border-beige pl-4">
                  {item.explanation}
                </p>
              </details>

              {/* RAG Sections */}
              <details className="mt-3 group">
                <summary className="cursor-pointer text-gold-accent font-semibold group-open:mb-2">
                  View Relevant Sections
                </summary>

                {item.sections?.map((sec, i) => (
                  <div key={i} className="mt-2 p-3 bg-beige/50 rounded-lg border border-navy/10">
                    <p className="font-medium text-navy">
                      {sec.act} Section {sec.section}
                    </p>
                    <p className="text-sm text-navy/70">{sec.title}</p>
                  </div>
                ))}
              </details>
            </>
          )}

          {/* 🟢 COMPLAINT TYPE */}
          {item.type === "complaint" && (
            <>
              <p className="mt-4 text-lg text-navy">
                Complaint generated for:{" "}
                <strong className="font-semibold">{item.complaint_data.full_name}</strong>
              </p>

              <p className="text-sm text-navy/60 mt-1">
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