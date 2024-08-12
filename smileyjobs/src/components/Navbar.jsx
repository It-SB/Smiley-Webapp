/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Menu toggle button
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/about", title: "About Us" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/contact", title: "Contact" },
  ];

  // Add the "Post A Job" item only if the user's email is lettimaks@gmail.com
  if (
    user?.email === "lettimaks@gmail.com" ||
    user?.email === "Lwando@smileyjobs.co" ||
    // user?.email === "lethabolesheleba2003@gmail.com" ||
    user?.email === "skillsbureausites@gmail.com"
  ) {
    navItems.push(
      { path: "/post-job", title: "Post A Job" },
      { path: "/my-job", title: "My Jobs" }
    );
  }

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center text-2xl">
          <img
            src="https://smileyjobs.co/assets/img/logo/Smiley%20Jobs%20Logo.png"
            alt=""
            className="w-16 h-16 mr-5"
          />
          <span className="hidden lg:inline">SmileyJobs</span>
        </a>

        {/* Nav items */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
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
                {user.photoURL ? (
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={user.photoURL}
                    alt=""
                  />
                ) : (
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="py-2 px-5 border rounded hover:bg-blue hover:text-white"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/login"
                className="bg-blue py-2 px-5 text-white rounded"
              >
                Sign up
              </Link>
            </>
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
        className={`px-4 bg-black py-5 rounded-sm ${
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

          {!user && (
            <li className="text-white py-1">
              <Link to="/login">Log in</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
