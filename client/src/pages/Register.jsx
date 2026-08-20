import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerAuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useCustomerAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
        <h1 className="text-2xl font-serif mb-6 text-center text-[#3F010C]">Create Account</h1>

        {error && <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}

        <label className="text-sm text-gray-600">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 text-sm"
        />

        <label className="text-sm text-gray-600">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 text-sm"
        />

        <label className="text-sm text-gray-600">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 text-sm"
        />

        <label className="text-sm text-gray-600">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border rounded-md px-3 py-2 mt-1 mb-6 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3F010C] text-white py-2.5 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" state={{ from: redirectTo }} className="text-[#3F010C] underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}