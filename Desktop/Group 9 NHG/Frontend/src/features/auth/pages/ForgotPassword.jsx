import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";
import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";
import { forgotPassword, resetPassword } from "../services/authService";

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const initialToken = searchParams.get("token") || "";
  const [step, setStep] = useState(initialToken ? "reset" : "request");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email.trim());
      setSuccess("Reset token sent. Please check your email.");
      setStep("reset");
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!token.trim() || !newPassword || !confirmPassword) {
      setError("Please fill in token, new password, and confirm password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        token: token.trim(),
        newPassword,
        confirmPassword,
      });
      setSuccess("Password reset successful. You can now sign in.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1f6b50] hover:underline"
          >
            <ArrowLeft size={16} /> Back to website
          </Link>

          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#16243e] text-white">
              {step === "request" ? <Mail size={22} /> : <KeyRound size={22} />}
            </div>
          </div>

          <h1 className="text-center font-serif text-2xl text-[#16243e]">
            Reset your password
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            {step === "request"
              ? "Enter your email and we will send a password reset token."
              : "Enter the token from your email and create a new password."}
          </p>

          <div className="my-6 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setStep("request")}
              className={`rounded-md py-2 text-sm font-semibold transition ${
                step === "request"
                  ? "bg-white text-[#16243e] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Email // veryfy the email address
            </button>
            <button
              type="button"
              onClick={() => setStep("reset")}
              className={`rounded-md py-2 text-sm font-semibold transition ${
                step === "reset"
                  ? "bg-white text-[#16243e] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Reset
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {step === "request" ? (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold tracking-wide text-[#16243e]">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="user@example.com"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#16243e] focus:ring-2 focus:ring-[#16243e]/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#1f6b50] py-3 font-semibold text-white transition hover:bg-[#19553f] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Get reset token"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <div>
                <label htmlFor="token" className="mb-2 block text-xs font-semibold tracking-wide text-[#16243e]">
                  RESET TOKEN
                </label>
                <input
                  id="token"
                  type="text"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  placeholder="TOKEN_FROM_EMAIL"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#16243e] focus:ring-2 focus:ring-[#16243e]/20"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-2 block text-xs font-semibold tracking-wide text-[#16243e]">
                  NEW PASSWORD
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="newpass123"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#16243e] focus:ring-2 focus:ring-[#16243e]/20"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-xs font-semibold tracking-wide text-[#16243e]">
                  CONFIRM PASSWORD
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="newpass123"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#16243e] focus:ring-2 focus:ring-[#16243e]/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#1f6b50] py-3 font-semibold text-white transition hover:bg-[#19553f] disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your password?{" "}
            <Link to="/" className="font-semibold text-[#1f6b50] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
