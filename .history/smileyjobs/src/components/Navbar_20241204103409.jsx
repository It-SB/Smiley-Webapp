import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { useUser, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser(); // Clerk hook to get the user object
  const { signOut } = useClerk();
  // console.log(user);

  const handleLogout = () => {
    signOut();
  };

  // Menu toggle button
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About Us" },
    // { path: "/salary", title: "Salary Estimate" },
    { path: "/contact", title: "Contact" },
  ];

  // Add the "Post A Job" item only if the user's email is lettimaks@gmail.com
  if (
    user?.primaryEmailAddress?.emailAddress === "lettimaks@gmail.com" ||
    user?.primaryEmailAddress?.emailAddress === "Lwando@smileyjobs.co" ||
    user?.primaryEmailAddress?.emailAddress === "Recruit@skillsbureau.co.za" ||
    user?.primaryEmailAddress?.emailAddress === "lemogang@smileyjobs.co" ||
    // user?.email === "lethabolesheleba2003@gmail.com" ||
    user?.primaryEmailAddress?.emailAddress === "skillsbureausites@gmail.com"
  ) {
    navItems.push(
      { path: "/post-job", title: "Post A Job" },
      { path: "/my-job", title: "My Jobs" }
    );
  }

  return (
    <header className="bg-yellow-200  max-w-screen-2xl mx-auto xl:px-24 px-4 text-blue">
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
                {user.imageUrl ? (
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-transparent"
                    src={user.imageUrl}
                    alt=""
                  />
                ) : (
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-transparent"
                    src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                    alt=""
                  />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="py-2 px-5 border border-blue rounded hover:bg-blue hover:text-white"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link 
              // to="https://relevant-alpaca-95.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fsmiley-webapp.vercel.app%2F" 
              to ='/logins'
              className="py-2 px-5 border border-blue shadow bg-yellow-400 hover:shadow-blue hover:shadowrounded">
                Log in 
              </Link>
              <Link
                // to="https://relevant-alpaca-95.accounts.dev/sign-up?redirect_url=https%3A%2F%2Fsmiley-webapp.vercel.app%2F"
              to ='/signups'
                className="bg-blue py-2 px-5 shadow-2xl hover:shadow-white text-white rounded"
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
            <li className="text-white py-1 hover:bg-blue">
              <Link to="/logins">Log in</Link>
            </li>
          )}
          <li className="text-white py-1">
            <Link to="/signups">Signup</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
