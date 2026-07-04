import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { setToken, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "Citizen",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password
    ) {
      return toast.error(
        "Please fill all required fields"
      );
    }

    try {
      setLoading(true);

      const data = await registerUser(form);

      setToken(data.token);
      setUser(data.user);

      toast.success(data.message);

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Create Account
        </h1>

        {/* Full Name */}

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        {/* Email */}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        {/* Phone */}

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        {/* Role */}

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        >
          <option value="Citizen">
            Citizen
          </option>

          <option value="Municipality">
            Municipality
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>

        {/* Password */}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        {/* Register Button */}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        {/* Login Link */}

        <p className="mt-6 text-center text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-emerald-400 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;