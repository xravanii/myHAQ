import React from "react";

const ResultPanel = ({ result }) => {
  if (!result || !result.results) return null;

  return (
    <div className="w-1/3 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4 text-blue-600">
        Legal Results
      </h3>

      {result.results.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4"
        >
          <h4 className="font-semibold text-lg text-gray-800">
            {item.act} Section {item.section}
          </h4>

          <p className="text-gray-600 font-medium">{item.title}</p>

          <p className="mt-2 text-gray-700">{item.summary}</p>

          <p className="mt-2 text-gray-800">
            <strong>Punishment:</strong> {item.punishment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultPanel;