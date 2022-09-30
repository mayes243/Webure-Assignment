import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const auth = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // clear token if logged out
    if (auth?.token) {
      const decodedToken = decode(auth.token);

      if (decodedToken.exp * 1000 < new Date().getTime())
        localStorage.clear() && navigate("/admin/signin");
    }
    //
    setUser(JSON.parse(localStorage.getItem("token")));
    setIsOpen(false);
  }, [auth]);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div class="hidden md:ml-10 md:block md:space-x-8 md:pr-4 text-lg">
          {[
            { title: "Dashboard", path: "/dashboard" },
            { title: "Add Blogs", path: "/blog/add" },
            { title: "Features", path: "#" },
            { title: "Marketplace", path: "#" },
            { title: "Company", path: "#" },
          ].map((nav) => (
            <Link
              to={nav.path}
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              {nav.title}
            </Link>
          ))}
        </div>

        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <button
                type="button"
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white px-3"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <sapn className="h-8 w-8 p-1">👤</sapn>
                <span className="text-center p-1 font-semibold">
                  {user?.result.email}
                </span>
              </button>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                    Settings
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/admin/signin");
                    }}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
