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
      <div className="bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Complaint Letter Generator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="full_name" placeholder="Full Name"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={handleChange} />

              <input name="phone" placeholder="Phone Number"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={handleChange} />
            </div>

            <input name="address" placeholder="Address"
              className="border rounded-lg p-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required onChange={handleChange} />
          </div>

          {/* Incident Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Incident Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" name="incident_date"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={handleChange} />

              <input name="incident_location" placeholder="Incident Location"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required onChange={handleChange} />
            </div>

            <input name="police_station" placeholder="Police Station (Optional)"
              className="border rounded-lg p-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange} />

            <textarea name="description"
              placeholder="Describe the incident clearly..."
              rows="5"
              className="border rounded-lg p-3 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required onChange={handleChange}
            />
          </div>

          {/* Optional Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Additional Information (Optional)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="accused_name" placeholder="Accused Name"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange} />

              <input name="witness_details" placeholder="Witness Details"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange} />

              <input name="evidence_details" placeholder="Evidence Details"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange} />

              <input name="loss_amount" placeholder="Estimated Loss"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Generating..." : "Generate Complaint"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ComplaintGenerator;