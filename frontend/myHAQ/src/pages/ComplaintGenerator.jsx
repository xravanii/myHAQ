import { useState } from "react";

const ComplaintGenerator = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    phone: "",
    police_station: "",
    incident_date: "",
    incident_location: "",
    description: "",
    accused_name: "",
    witness_details: "",
    evidence_details: "",
    loss_amount: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/complaint/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to generate complaint");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "complaint_letter.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

    } catch (error) {
      alert("Error generating complaint");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white shadow-2xl rounded-xl p-10 border border-navy/10">

        <h2 className="text-4xl font-bold text-dark-navy mb-8 text-center">
          Complaint Letter Generator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold text-navy mb-4 border-b-2 border-gold-accent pb-2">
              Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="full_name" placeholder="Full Name"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                required onChange={handleChange} />

              <input name="phone" placeholder="Phone Number"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                required onChange={handleChange} />
            </div>

            <input name="address" placeholder="Full Residential Address"
              className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 mt-6 w-full focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
              required onChange={handleChange} />
          </div>

          {/* Incident Details */}
          <div>
            <h3 className="text-xl font-semibold text-navy mb-4 border-b-2 border-gold-accent pb-2">
              Incident Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="date" name="incident_date"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                required onChange={handleChange} />

              <input name="incident_location" placeholder="Incident Location"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                required onChange={handleChange} />
            </div>

            <input name="police_station" placeholder="Police Station (e.g., 'Civil Lines')"
              className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 mt-6 w-full focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
              onChange={handleChange} />

            <textarea name="description"
              placeholder="Describe the incident clearly and chronologically..."
              rows="5"
              className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 mt-6 w-full focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
              required onChange={handleChange}
            />
          </div>

          {/* Optional Details */}
          <div>
            <h3 className="text-xl font-semibold text-navy mb-4 border-b-2 border-gold-accent pb-2">
              Additional Information (Optional)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="accused_name" placeholder="Accused Name(s)"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                onChange={handleChange} />

              <input name="witness_details" placeholder="Witness Name(s) and Contact"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                onChange={handleChange} />

              <input name="evidence_details" placeholder="Details of Evidence (e.g., 'CCTV footage')"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                onChange={handleChange} />

              <input name="loss_amount" placeholder="Estimated Loss/Value"
                className="bg-cream/50 border-2 border-navy/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
                onChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-dark-navy text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Download Complaint PDF"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ComplaintGenerator;