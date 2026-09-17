import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const ADMIN_EMAILS = [
  "lettimaks@gmail.com",
  "lemogang@smileyjobs.co",
  "recruit@skillsbureau.co.za",
  "lethabolesheleba2003@gmail.com",
  "ntivoredolf@gmail.com",
  "skillsbureausites@gmail.com",
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await logOut();
  };

  const handleMenuToggler = () => {
    setIsMenuOpen((open) => !open);
  };

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About Us" },
    { path: "/services", title: "Services" },
    { path: "/job-seekers", title: "CV Bootcamp" },
    { path: "/contact", title: "Contact" },
  ];

  const isAdmin = ADMIN_EMAILS.includes((user?.email || "").toLowerCase());

  if (isAdmin) {
    navItems.push(
      { path: "/post-job", title: "Post A Job" },
      { path: "/my-job", title: "My Jobs" }
    );
  }

  const initial = (user?.displayName || user?.email || "U").charAt(0).toUpperCase();

  return (
    <header className="bg-yellow-200 text-blue">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10 xl:px-16">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/Smiley Jobs Logo.png"
            alt="SmileyJobs"
            className="h-11 w-11 shrink-0 lg:h-12 lg:w-12"
          />
          <span className="hidden whitespace-nowrap text-xl font-semibold xl:inline">
            SmileyJobs
          </span>
        </a>

        {/* Nav items — desktop only, own scroll room, never wrap */}
        <ul className="hidden flex-1 items-center justify-center gap-6 overflow-x-auto lg:flex xl:gap-8">
          {navItems.map(({ path, title }) => (
            <li key={path} className="shrink-0 whitespace-nowrap text-[15px]">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition-colors hover:text-blue/70 ${
                    isActive ? "font-semibold text-blue" : "text-blue/80"
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth controls — desktop only */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {user ? (
            <>
              <div
                title={user.email}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white"
              >
                {initial}
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 whitespace-nowrap rounded border border-blue px-4 py-2 text-sm font-medium transition-colors hover:bg-blue hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="shrink-0 whitespace-nowrap rounded border border-blue bg-yellow-400 px-4 py-2 text-sm font-medium shadow transition-shadow hover:shadow-md"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="shrink-0 whitespace-nowrap rounded bg-blue px-4 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle — everything below lg */}
        <button
          onClick={handleMenuToggler}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="shrink-0 rounded p-2 lg:hidden"
        >
          {isMenuOpen ? (
            <FaXmark className="h-5 w-5 text-blue/80" />
          ) : (
            <FaBarsStaggered className="h-5 w-5 text-blue/80" />
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="border-t border-blue/10 bg-blue px-4 pb-6 pt-4 lg:hidden">
          <ul className="space-y-1">
            {navItems.map(({ path, title }) => (
              <li key={path}>
                <NavLink
                  onClick={handleMenuToggler}
                  to={path}
                  className={({ isActive }) =>
                    `block rounded px-2 py-2.5 text-white transition-colors hover:bg-white/10 ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}

            <li className="my-2 border-t border-white/15" />

            {user ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded px-2 py-2.5 text-left font-medium text-red-300 transition-colors hover:bg-white/10"
                >
                  Log out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={handleMenuToggler}
                    className="block rounded px-2 py-2.5 text-white transition-colors hover:bg-white/10"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={handleMenuToggler}
                    className="block rounded px-2 py-2.5 font-medium text-yellow-300 transition-colors hover:bg-white/10"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;