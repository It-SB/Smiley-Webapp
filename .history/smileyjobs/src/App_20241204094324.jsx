import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HelmetProvider, Helmet } from "react-helmet-async";

function App() {
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
