import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    < head>
          < link rel="manifest" href="/manifest.webmanifest" />
          < link rel="apple-touch-icon" href="/icon-192x192.png" />
          < meta name="theme-color" content="#fff" />
        < /Head></Head>
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
