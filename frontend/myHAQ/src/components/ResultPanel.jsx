import React from "react";

const ResultPanel = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="w-1/3 bg-beige border-l-4 border-gold-accent p-6 overflow-y-auto">
      <h3 className="text-2xl font-bold mb-6 text-dark-navy">
        Relevant Legal Sections
      </h3>

      {sections.map((item) => (
        <div
          key={item.id}
          className="bg-cream p-5 rounded-xl shadow-md mb-4 border border-navy/10 hover:shadow-lg transition-shadow duration-300"
        >
          <h4 className="font-semibold text-xl text-navy">
            {item.act} - Section {item.section}
          </h4>

          <p className="text-gold-accent font-medium">{item.title}</p>

          <p className="mt-3 text-navy/80 text-sm">
            {item.summary}
          </p>

          <p className="mt-3 text-navy text-sm">
            <strong>Punishment:</strong> {item.punishment}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultPanel;
