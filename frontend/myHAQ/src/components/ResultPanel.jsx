import React from "react";

const ResultPanel = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="w-1/3 bg-gray-50 border-l p-6 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Relevant Laws
      </h3>

      {sections.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >
          <h4 className="font-semibold text-lg text-gray-800">
            {item.act} Section {item.section}
          </h4>

          <p className="text-gray-600">{item.title}</p>

          <p className="mt-2 text-gray-700 text-sm">
            {item.summary}
          </p>

          <p className="mt-2 text-gray-800 text-sm">
            <strong>Punishment:</strong> {item.punishment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultPanel;
