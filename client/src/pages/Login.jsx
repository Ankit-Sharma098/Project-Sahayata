import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setToken, setUser } = useAuth();

  const redirectTo =
    location.state?.from || "/dashboard";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login Successful");

      // ===========================
      // Role Based Redirect
      // ===========================

      if (data.user.role === "Citizen") {

        navigate(redirectTo, {
          replace: true,
        });

      } else if (
        data.user.role === "Municipality"
      ) {

        navigate("/municipality", {
          replace: true,
        });

      } else if (
        data.user.role === "Admin"
      ) {

        navigate("/admin", {
          replace: true,
        });

      } else {

        navigate("/", {
          replace: true,
        });

      }

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Invalid Credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-5 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;