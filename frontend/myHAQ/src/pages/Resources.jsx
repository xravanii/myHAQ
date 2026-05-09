import React from 'react';

const resources = [
  {
    title: "National Cyber Crime Portal",
    category: "Cyber Safety",
    description: "Report online fraud, cyber bullying, financial scams, and digital crimes.",
    link: "https://cybercrime.gov.in",
  },
  {
    title: "National Legal Services Authority",
    category: "Legal Aid",
    description: "Access free legal aid services and legal awareness resources.",
    link: "https://nalsa.gov.in",
  },
  {
    title: "National Commission for Women",
    category: "Women Safety",
    description: "File complaints and access women protection resources.",
    link: "https://ncw.nic.in",
  },
  {
    title: "Consumer Helpline",
    category: "Consumer Rights",
    description: "Register complaints related to products and services.",
    link: "https://consumerhelpline.gov.in",
  },
  {
    title: "Digital Police Portal",
    category: "Police Services",
    description: "Access digital police and citizen support services.",
    link: "https://digitalpolice.gov.in",
  },
  {
    title: "India Code",
    category: "Legal Information",
    description: "Official repository of Indian laws and acts.",
    link: "https://www.indiacode.nic.in",
  },
  {
    title: "eCourts Services",
    category: "Court Services",
    description: "Access court case status and judicial services.",
    link: "https://ecourts.gov.in",
  },
  {
    title: "Emergency Response Support System",
    category: "Emergency Help",
    description: "National emergency response support services.",
    link: "https://112.gov.in",
  },
  {
    title: "National Human Rights Commission",
    category: "Human Rights",
    description: "Report human rights violations and access citizen protection services.",
    link: "https://nhrc.nic.in",
  },
  {
    title: "Childline India",
    category: "Child Protection",
    description: "24×7 emergency support and protection helpline for children in distress.",
    link: "https://www.childlineindia.org.in",
  },
  {
    title: "E-Daakhil",
    category: "Consumer Complaints",
    description: "Online platform for filing consumer complaints digitally.",
    link: "https://edaakhil.nic.in",
  },
  {
    title: "DigiLocker",
    category: "Government Services",
    description: "Secure digital storage and access for official government documents.",
    link: "https://www.digilocker.gov.in",
  },
  {
    title: "Department of Justice",
    category: "Judicial Services",
    description: "Official portal for judicial reforms, legal information, and justice initiatives.",
    link: "https://doj.gov.in",
  },
];

const getCategoryClass = (category) => {
  switch (category) {
    case "Cyber Safety":
      return "bg-red-100 text-red-700";
    case "Legal Aid":
      return "bg-green-100 text-green-700";
    case "Women Safety":
      return "bg-pink-100 text-pink-700";
    case "Consumer Rights":
      return "bg-purple-100 text-purple-700";
    case "Police Services":
      return "bg-blue-100 text-blue-700";
    case "Legal Information":
      return "bg-yellow-100 text-yellow-700";
    case "Court Services":
      return "bg-indigo-100 text-indigo-700";
    case "Emergency Help":
      return "bg-orange-100 text-orange-700";
    case "Human Rights":
      return "bg-teal-100 text-teal-700";
    case "Child Protection":
      return "bg-cyan-100 text-cyan-700";
    case "Consumer Complaints":
      return "bg-lime-100 text-lime-700";
    case "Government Services":
      return "bg-slate-100 text-slate-700";
    case "Judicial Services":
      return "bg-fuchsia-100 text-fuchsia-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Resources = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-dark-navy mb-4">
          Government Help & Resources
        </h1>
        <p className="text-lg text-navy/80 max-w-3xl mx-auto">
          Access a curated list of official Indian government portals for legal help, safety, and consumer rights. These resources are here to provide you with direct support and information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-navy/10 flex flex-col p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex-grow">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryClass(resource.category)}`}>
                {resource.category}
              </span>
              <h2 className="text-xl font-bold text-navy mt-4 mb-2">{resource.title}</h2>
              <p className="text-navy/70 text-sm">{resource.description}</p>
            </div>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full text-center bg-navy text-white font-semibold py-2 rounded-lg hover:bg-dark-navy transition-colors duration-300"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
