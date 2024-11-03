import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import routes from "./router/routes";
import { FaFile } from "react-icons/fa";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const RecursiveNav = ({ routes, parentPath = "/", listClassName }) => {
  // State to keep track of which folders are open
  const [openFolders, setOpenFolders] = useState({});

  // Function to toggle the folder open state
  const toggleFolder = (path) => {
    setOpenFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <ul className="space-y-2">
      {routes.map((route, index) => {
        const fullPath = `${parentPath}${
          route.path !== "/" ? `${route.path}` : ""
        }`;
        const isOpen = openFolders[fullPath];

        return (
          <li key={index} className={listClassName}>
            {/* Render folder icon for parent routes and file icon for leaf routes */}
            {route.children ? (
              <>
                <div
                  onClick={() => toggleFolder(fullPath)}
                  className={`flex items-center cursor-pointer font-medium transition-colors duration-200 ease-in-out ${
                    isOpen
                      ? "text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  } rounded-md p-2`}
                >
                  {isOpen ? (
                    <RiArrowDropDownLine className="text-gray-700 text-3xl mr-2" />
                  ) : (
                    <RiArrowDropRightLine className="text-gray-700 text-3xl mr-2" />
                  )}
                  <span>
                    {route.path === "/"
                      ? "Home"
                      : route.path.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                {/* AnimatePresence and motion for smooth slide effect */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} // Customize easing function for smoother animation
                      style={{ overflow: "hidden" }} // Ensure child elements are hidden during transition
                    >
                      <RecursiveNav
                        routes={route.children}
                        parentPath={fullPath}
                        listClassName="pl-6 text-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <NavLink
                  to={fullPath}
                  className={({ isActive }) =>
                    `flex items-center transition-colors duration-200 ease-in-out ${
                      isActive
                        ? "text-blue-700 bg-blue-100"
                        : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    } rounded-md p-2`
                  }
                >
                  <FaFile className="text-gray-700 mr-2" />
                  {route.path.replace("-", " ").toUpperCase()}
                </NavLink>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const App = () => {
  return (
    <div className="flex ">
      <nav className="w-64 bg-gray-50 border-r p-4 h-screen">
        <h2 className="text-xl font-semibold mb-4">Navigate</h2>
        <RecursiveNav routes={routes.routes} />
      </nav>

      <main className="flex-1 flex items-center flex-col">
        <h1 className="w-full mb-10 text-3xl font-bold border-b p-4 self-start">
          Welcome to UI Practice
        </h1>
        {/* Outlet renders the nested route components */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;
