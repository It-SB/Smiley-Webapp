import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

// Fetch Clerk publishable key from environment variables
const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerk_key) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerk_key}>
    < Head>
          < link rel="manifest" href="/manifest.webmanifest" />
          < link rel="apple-touch-icon" href="/icon-192x192.png" />
          < meta name="theme-color" content="#fff" />
       </>
    <RouterProvider router={router} />
  </ClerkProvider>
);
