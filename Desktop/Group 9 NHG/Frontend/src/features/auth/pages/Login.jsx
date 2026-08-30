import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { loginUser } from "../services/authService";
import { saveAuthData } from "../../../utils/authStorage";

export default function Login({ onClose, onSwitchToRegister }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!identifier || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(identifier, password);

      await saveAuthData(data);

      if (onClose) onClose();

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 w-full max-w-md mx-auto">

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition"
          >
            <X size={22} />
          </button>
        )}

        {/* Logo */}// NHG logo added
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#16243e] flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center font-serif text-2xl text-[#16243e] mb-1">
          Welcome back
        </h1>

        <p className="text-center text-sm text-slate-500 mb-6">
          Sign in to your NHG Patient Portal account
        </p>

        {/* Tabs */}// can switch to register
        <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="flex-1 text-center text-sm font-medium text-slate-500 py-2 rounded-md hover:text-slate-700 transition-colors"
          >
            Create account
          </button>

          <button
            type="button"
            className="flex-1 text-center text-sm font-semibold text-[#16243e] bg-white py-2 rounded-md shadow-sm"
          >
            Sign in
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold tracking-wide text-[#16243e] mb-2">
              EMAIL
            </label>

            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter email address"
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold tracking-wide text-[#16243e] mb-2">
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#16243e]/20 focus:border-[#16243e] outline-none"
            />
          </div>
          {/* Remember */}
          <div className="flex w-full justify-end text-sm">
            <Link
              to="/forgot-password"
              onClick={() => onClose?.()}
              className="text-[#16243e] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#1f6b50] hover:bg-[#19553f] text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in securely"}
          </button>
        </form>
        {/* Notice */}
        <div className="mt-6 bg-[#f6f1e7] rounded-lg p-4">
          <p className="font-semibold text-[#16243e] mb-1">
            Security notice
          </p>

          <p className="text-xs text-slate-500 leading-relaxed">
            This is a secure government portal. Sessions expire after
            30 minutes of inactivity. Never share your login credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
