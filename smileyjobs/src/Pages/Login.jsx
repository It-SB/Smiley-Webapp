import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const { user, loading, login, signUpWithGmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!loading && user) navigate(from, { replace: true });
  }, [loading, user, navigate, from]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    try {
      await login(form.email.value.trim(), form.password.value);
    } catch (error) {
      const messages = {
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/user-not-found": "No account was found for this email.",
        "auth/wrong-password": "Email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };
      setErrorMessage(messages[error.code] || "Unable to log in. Please try again.");
    }
  };

  const handleGoogle = async () => {
    setErrorMessage("");
    try {
      await signUpWithGmail();
    } catch (error) {
      setErrorMessage(error.code === "auth/popup-closed-by-user"
        ? "The Google sign-in window was closed."
        : "Unable to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-blue mb-2">Welcome back</h1>
        <p className="text-gray-600 mb-6">Sign in to manage your SmileyJobs account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" autoComplete="email" required className="w-full border border-blue rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input name="password" type="password" autoComplete="current-password" required className="w-full border border-blue rounded px-3 py-2" />
          </div>

          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button type="submit" className="w-full bg-blue text-white py-2 rounded">Log in</button>
        </form>

        <button type="button" onClick={handleGoogle} className="w-full mt-3 border border-blue text-blue py-2 rounded">
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
