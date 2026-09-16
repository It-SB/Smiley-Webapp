import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await logOut();
  };

  // Menu toggle button
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About Us" },
    { path: "/services", title: "Services" },
    // { path: "/jobs", title: "Jobs" },
    {path: "/job-seekers", title: "CV Bootcamp" },
    { path: "/contact", title: "Contact" },
  ];

  // Add the "Post A Job" item only if the user's email is lettimaks@gmail.com
  if (
    user?.email === "lettimaks@gmail.com" ||
    user?.email === "Lemogang@smileyjobs.co" ||
    user?.email === "Recruit@skillsbureau.co.za" ||
    user?.email === "lemogang@smileyjobs.co" ||
    user?.email === "lethabolesheleba2003@gmail.com" ||
    user?.email === "skillsbureausites@gmail.com"
  ) {
    navItems.push(
      { path: "/post-job", title: "Post A Job" },
      { path: "/my-job", title: "My Jobs" }
    );
  }

  return (
    <header className="bg-yellow-200 px-24  text-blue">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center text-2xl">
          <img
            src="/Smiley Jobs Logo.png"
            alt=""
            className="w-16 h-16 mr-5"
          />
          <span className="hidden lg:inline">SmileyJobs</span>
        </a>

        {/* Nav items */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-blue">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sign up / sign out buttons */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="h-10 w-10 rounded-full bg-blue text-white flex items-center justify-center font-semibold">
                  {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="py-2 px-5 border border-blue rounded hover:bg-blue hover:text-white"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="space-x-5">
              <Link to="/login" className="py-2 px-5 border border-blue shadow bg-yellow-400 hover:shadow-blue">
                Log in
              </Link>
              <Link to="/signup" className="bg-blue py-2 px-5 shadow-2xl hover:shadow-white text-white rounded">
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary/75" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary/75" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu items */}
      <div
        className={`px-4 bg-blue py-5 border-rou rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          {user ? (
            <li className="text-white py-1 hover:bg-blue">
              <button onClick={handleLogout} className="text-red-400">Logout</button>
            </li>
          ) : (
            <>
              <li className="text-white py-1 hover:bg-blue"><Link to="/login">Log in</Link></li>
              <li className="text-white py-1"><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
