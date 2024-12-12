import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    const isProduction = window.location.hostname === "smileyjobs.co";
    if (isProduction) {
      const baseDomain = "https://smileyjobs.co";
      const currentPath = location.pathname;
      const newUrl = `${baseDomain}${currentPath}`;
      window.history.pushState(null, "", newUrl);
    }
  }, [location]);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#fff" />
      </Helmet>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </HelmetProvider>
  );
}

export default App;
