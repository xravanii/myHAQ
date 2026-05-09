import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", form.email);   // MUST be "username"
      formData.append("password", form.password);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cream">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-96 border border-navy/10">
        <h2 className="text-3xl font-bold mb-8 text-dark-navy text-center">
          Login to <span className="text-gold-accent">MYHAQ AI</span>
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 bg-cream/50 border-2 border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-cream/50 border-2 border-navy/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-accent text-navy placeholder-navy/60"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-navy text-white py-3 rounded-lg hover:bg-dark-navy transition-all duration-300 font-bold"
        >
          Login
        </button>

        <p className="mt-6 text-sm text-center text-navy/80">
          Don’t have an account?{" "}
          <Link to="/register" className="text-gold-accent font-semibold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;