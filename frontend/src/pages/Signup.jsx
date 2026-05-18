import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/signup", formData);

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-800 to-blue-950 text-white">
        <h1 className="text-6xl font-extrabold leading-tight">
          Join <br />
          TaskSphere
        </h1>

        <p className="mt-8 text-xl text-blue-100 leading-relaxed">
          Build, scale, and manage your productivity ecosystem with a
          premium full-stack platform designed for startups,
          professionals, and enterprises.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-sm text-blue-100">
              Team Efficiency
            </p>
            <h3 className="text-4xl font-extrabold mt-2">
              94%
            </h3>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl">
            <p className="text-sm text-blue-100">
              User Satisfaction
            </p>
            <h3 className="text-4xl font-extrabold mt-2">
              98%
            </h3>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-blue-700">
              Signup
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Create your premium productivity account
            </p>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full mb-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none text-slate-900 dark:text-white"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>

          <p className="mt-6 text-center text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;