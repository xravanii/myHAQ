import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form
      );

      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cream">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96 border border-navy/10">
        <h2 className="text-3xl font-bold mb-8 text-dark-navy text-center">
          Create an Account
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 bg-cream/50 border-2 border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-cream/50 border-2 border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-navy text-white py-3 rounded-lg hover:bg-dark-navy transition-all duration-300 font-bold"
        >
          Register
        </button>

        <p className="mt-6 text-sm text-center text-navy/80">
          Already have an account?{" "}
          <Link to="/login" className="text-gold-accent font-semibold hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;